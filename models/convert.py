"""
STL -> GLB for iJewel and the site's own viewer.

For every folder in models/stl/<handle>/, loads each STL, names the mesh the way
iJewel's Playground auto-assigns materials ("Metal Yellow Gold", "Diamond Round",
"Sapphire Oval"), gives it a PBR material so it also renders sensibly in any glTF
viewer, writes models/glb/<handle>.glb, then compresses it with gltf-transform if
the CLI is available (installed in storefront/node_modules).

Usage:
  python models/convert.py                 # convert everything
  python models/convert.py shooting-star-ring   # one piece
  python models/convert.py --scale 0.001   # if STLs arrived in microns
"""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path

import numpy as np
import trimesh

ROOT = Path(__file__).resolve().parent
STL_DIR = ROOT / "stl"
GLB_DIR = ROOT / "glb"
GLTF_TRANSFORM = ROOT.parent / "storefront" / "node_modules" / ".bin" / ("gltf-transform.cmd" if sys.platform == "win32" else "gltf-transform")

MAX_FACES = 140_000

METAL_COLORS = {
    "metal": (1.0, 0.77, 0.34),  # yellow gold at default; the viewer swaps it
}
GEM_COLORS = {
    "diamond": (1.0, 1.0, 1.0),
    "sapphire": (0.05, 0.2, 0.75),
    "ruby": (0.75, 0.05, 0.12),
    "emerald": (0.05, 0.55, 0.3),
}


def material_name(stem: str) -> tuple[str, str]:
    """'diamond-round' -> ('Diamond Round', 'gem'); 'metal' -> ('Metal Yellow Gold', 'metal')."""
    parts = [p for p in stem.lower().replace("_", "-").split("-") if p]
    kind = parts[0] if parts else "metal"
    if kind == "metal" or kind == "all":
        return "Metal Yellow Gold", "metal"
    cut = parts[1].capitalize() if len(parts) > 1 else "Round"
    return f"{kind.capitalize()} {cut}", "gem"


def pbr(kind: str, name: str) -> trimesh.visual.material.PBRMaterial:
    base = parts = name.lower().split(" ")[0]
    if kind == "metal":
        rgb = METAL_COLORS["metal"]
        return trimesh.visual.material.PBRMaterial(
            name=name, baseColorFactor=[*rgb, 1.0], metallicFactor=1.0, roughnessFactor=0.12
        )
    rgb = GEM_COLORS.get(base, (1.0, 1.0, 1.0))
    alpha = 0.35 if base == "diamond" else 0.6
    return trimesh.visual.material.PBRMaterial(
        name=name, baseColorFactor=[*rgb, alpha], metallicFactor=0.0, roughnessFactor=0.02, alphaMode="BLEND"
    )


def convert(handle_dir: Path, scale: float) -> Path | None:
    stls = sorted(handle_dir.glob("*.stl"))
    if not stls:
        return None
    scene = trimesh.Scene()
    for stl in stls:
        mesh = trimesh.load_mesh(stl, force="mesh")
        if scale != 1.0:
            mesh.apply_scale(scale)
        # Cast files arrive at CAD resolution (up to 3M faces). Decimate to a web budget.
        if len(mesh.faces) > MAX_FACES:
            mesh = mesh.simplify_quadric_decimation(face_count=MAX_FACES)
        name, kind = material_name(stl.stem)
        mesh.visual = trimesh.visual.TextureVisuals(material=pbr(kind, name))
        mesh.metadata["name"] = name
        scene.add_geometry(mesh, node_name=name, geom_name=name)

    # Centre on the origin and sit the piece on y = 0 like a ring on a tray.
    bounds = scene.bounds
    centre = (bounds[0] + bounds[1]) / 2
    shift = -centre
    shift[1] = -bounds[0][1]
    for node in scene.graph.nodes_geometry:
        t = scene.graph[node][0].copy()
        t[:3, 3] += shift
        scene.graph.update(node, matrix=t)

    GLB_DIR.mkdir(exist_ok=True)
    out = GLB_DIR / f"{handle_dir.name}.glb"
    scene.export(out)
    size_before = out.stat().st_size

    if GLTF_TRANSFORM.exists():
        tmp = out.with_suffix(".opt.glb")
        subprocess.run(
            [str(GLTF_TRANSFORM), "optimize", str(out), str(tmp), "--compress", "draco", "--texture-compress", "webp"],
            check=False,
            capture_output=True,
        )
        if tmp.exists() and tmp.stat().st_size > 0:
            shutil.move(tmp, out)
    size_after = out.stat().st_size
    print(f"{handle_dir.name}: {len(stls)} parts, {np.round(scene.extents, 2)} mm, {size_before/1024:.0f} KB -> {size_after/1024:.0f} KB")
    return out


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    scale = 1.0
    if "--scale" in sys.argv:
        scale = float(sys.argv[sys.argv.index("--scale") + 1])
    targets = [STL_DIR / a for a in args] if args else sorted(p for p in STL_DIR.iterdir() if p.is_dir())
    manifest_path = ROOT / "embeds.json"
    manifest = json.loads(manifest_path.read_text()) if manifest_path.exists() else {}
    for d in targets:
        out = convert(d, scale)
        if out and d.name not in manifest:
            manifest[d.name] = {"glb": str(out.relative_to(ROOT)).replace("\\", "/"), "embed": ""}
    manifest_path.write_text(json.dumps(manifest, indent=2))
    print(f"manifest: {manifest_path}")


if __name__ == "__main__":
    main()
