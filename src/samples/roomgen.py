from math import cos,sin, sqrt
import json

lat = 45 # choose a (semi-arbitrary) latitude to perform georeference scaling

class RoomBoundary(object):
    """
    Builds a boundary representation of a Revit Room.
    """
    def __init__(self, room):
        self.room = room
        self.loops = []
        self.walk(room)

    def walk(self, room):
        """
        Given a Room, build up the (georeferenced) coordinate vertices.
        """
        loops = room.GetBoundarySegments(SpatialElementBoundaryOptions())
        for loop in loops:
            pts = []
            first = loop[0]
            for line in loop:
                pts.append(self.point_from_line(line))
            pts.append(self.point_from_line(first)) # close loop
            self.loops.append(pts)

    def point_from_line(self, line):
        """
        Grab the start point of each line.
        """
        pt = line.GetCurve().GetEndPoint(0)         # start pt
        return to_latlon(pt)


class FloorPlanMap(object):
    def __init__(self, selection):
        self.geojson = {
            "type": "FeatureCollection",
            "crs": { 
                "type": "name", 
                "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } 
                },
            "features": []
            }
        for room in selection:
            self.add_feature(room)
        
    def add_feature(self, room):
        """
        Add a Room to the existing Floor Plan.
        """
        boundary = RoomBoundary(room)
        feature = self.feature_with(boundary)
        self.geojson["features"].append(feature)
    
    def feature_with(self, boundary):
        """
        Serialize a boundary loop to a GeoJSON Feature,
        including optional metadata.
        """
        return {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": boundary.loops
            },
            "properties": {
                "name":boundary.room.GetParameters("Name")[0].AsString(),
                "number":boundary.room.GetParameters("Number")[0].AsString(),
                "level":boundary.room.GetParameters("Level")[1].AsString()
            }
        }

### Utilities ###
def to_latlon(pt):
    """
    Scale points in local (model) coordinate to georeferenced coordinates 
    by linearly scaling in proportion to fixed latitude. The closer to the 
    equator, the less the distortion.
    """
    return ((1/latdist(lat))*pt.X, (1/latdist(lat))*pt.Y, pt.Z) 


def deg2rad(deg):
    return deg * 3.1415926 / 180

def latdist(latdeg):
    lat = deg2rad(latdeg)
    return (111132.954 - 559.882*cos(2*lat) + 1.175*cos(4*lat))


def to_file(data, filename="floorplan.json"):
    with open(filename, 'w') as f:
        f.write(data)
        

### Toplevel ###
def run():
    """
    Toplevel - assumes Rooms have been isolated by Category and selected ahead of time.
    """
    rooms = [doc.GetElement(el) for el in uidoc.Selection.GetElementIds()]
    plan = FloorPlanMap(rooms)
    return json.dumps(plan.geojson)



