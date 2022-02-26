const house = new Entity();
house.addComponent(new GLTFShape("models/casa_ulla.gltf"));
house.addComponent(
  new Transform({
    scale: new Vector3(0.7, 0.7, 0.7),
    position: new Vector3(8, -0.25, 8),
    rotation: new Quaternion(0, 1, 0, -1),
  })
);
engine.addEntity(house);

let doorStatus: string = "closed";
let action: string = "Open";

const clip = new AudioClip("sounds/5.wav");
const tala = new AudioClip("sounds/13.wav")

// Create AudioSource component, referencing `clip`
const sourceDoor = new AudioSource(clip);
const sourceTree = new AudioSource(tala);


const pivot = new Entity();
pivot.addComponent(
  new Transform({
    position: new Vector3(10.25, 1.25, 5.2),
  })
);
engine.addEntity(pivot);

const door = new Entity();
door.addComponent(sourceDoor);
door.addComponent(
  new OnPointerDown(
    () => {
      if (doorStatus == "closed") {
        sourceDoor.playOnce();
        pivot.getComponent(Transform).rotate(Vector3.Up(), 90);
        doorStatus = "open";
        action = "Open";
      } else {
        sourceDoor.playOnce();
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
    scale: new Vector3(1.4, 2.2, 0.2),
    position: new Vector3(-0.7, -0.15, 0),
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

const houseMaterial = new Material();
houseMaterial.albedoColor = Color3.FromHexString("#654321");
houseMaterial.metallic = 0.0;
houseMaterial.roughness = 0.3;

//assign the material to the door
house.addComponent(houseMaterial);
