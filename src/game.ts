const house = new Entity();
house.addComponent(new GLTFShape("models/casa3.gltf"));
house.addComponent(new Transform({ position: new Vector3(8, 0, 8) }));
engine.addEntity(house);

let doorStatus: string = "closed";
let action: string = "Open";

const pivot = new Entity();
pivot.addComponent(
  new Transform({
    position: new Vector3(10.75, 1.25, 4),
  })
);
engine.addEntity(pivot);

const door = new Entity();
door.addComponent(
  new OnPointerDown(
    () => {
      if (doorStatus == "closed") {
        pivot.getComponent(Transform).rotate(Vector3.Up(), 90);
        doorStatus = "open";
        action = "Open";
      } else {
        pivot.getComponent(Transform).rotate(Vector3.Up(), -90);
        doorStatus = "closed";
        action = "Close";
      }
    },
    {
      hoverText: action,
      distance: 5,
    }
  )
);
door.setParent(pivot);
door.addComponent(new BoxShape());
door.addComponent(
  new Transform({
    scale: new Vector3(1.75, 2.3, 0.2),
    position: new Vector3(-1, 0, 0),
  })
);

engine.addEntity(door);

//define a material to color the door
const doorMaterial = new Material();
doorMaterial.albedoColor = Color3.FromHexString("#654321");
doorMaterial.metallic = 0.0;
doorMaterial.roughness = 0.3;

//assign the material to the door
door.addComponent(doorMaterial);
