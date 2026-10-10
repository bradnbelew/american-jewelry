"""Inventory every STL in models/_inbox: faces and extents in mm. Cast files, all metal."""
from pathlib import Path
import numpy as np, trimesh
INBOX = Path(__file__).resolve().parent / "_inbox"
for stl in sorted(INBOX.glob("*.stl")):
    m = trimesh.load_mesh(stl, force="mesh", process=False)
    print(f"{stl.name!r}: faces={len(m.faces):,} extents_mm={np.round(m.extents, 1).tolist()}", flush=True)
