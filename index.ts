var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
	
	var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
	light.diffuse = new BABYLON.Color3(1, 0, 0);
	
	// Skybox
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
	var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	skyboxMaterial.backFaceCulling = false;
	skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
	skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	skybox.material = skyboxMaterial;			
	
    var number = 0;
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Naiselim/WeddingShowcase/master/", "heart1.glb", scene, function (meshes){
        meshes[0].scaling = new BABYLON.Vector3(3, 3, 3);
        meshes[0].rotation = new BABYLON.Vector3(-Math.PI / 2, 0, 0);
        scene.registerBeforeRender(()=>{
            number += 1;
            if(number == 30)meshes[0].position.y = -0.5;
            else if(number == 60){
                number = 0;
                meshes[0].position.y = 0;
            }
        });
    });    
    return scene;

};