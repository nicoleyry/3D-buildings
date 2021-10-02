import * as THREE from "https://unpkg.com/three@0.123.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.123.0/examples/jsm/controls/OrbitControls";

// 'use strict';

let container, camera, controls, scene, renderer;

// GLOBAL
let artwork;

// MOUSE
let mouseX = 0;
let mouseY = 0;

function init() {
    container = document.querySelector('#scene-container');
    scene = new THREE.Scene();
    createCamera();
    createControls();
    createLights();
    createRenderer();
    createGeometries();
    createMaterials();
    createMeshes();

    document.addEventListener("mousemove", onDocumentMouseMove);
    window.addEventListener("resize", onWindowResize);

    renderer.setAnimationLoop(() => {
        render();
        update();
    });
}

function createCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 6, 20);
}

function createControls() {
    // 運行軌道控制
    controls = new OrbitControls(camera, container);
}

function createLights() {
    const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020); // 自然環境光
    const mainLight = new THREE.DirectionalLight( 0xffffff); // 太陽光
    mainLight.position.set(10, 10, 10);
    scene.add(ambientLight, mainLight);
}

function createRenderer() {
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );

    renderer.gammaFactor = 2.2;
    renderer.outputEncoding = THREE.GammaEncoding;
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.autoUpdate = false;
    
    container.appendChild( renderer.domElement );
}

function createGeometries() {
    const torreDiPisaBodyBottom = new THREE.CylinderBufferGeometry( 1, 1, 2, 64 );
    const torreDiPisaBodyParts = new THREE.CylinderBufferGeometry( 1, 0.97, 0.8, 20 );
    const torreDiPisaHead = new THREE.CylinderBufferGeometry( 0.75, 0.75, 0.7, 64 );

    const pyramidBig = new THREE.TetrahedronBufferGeometry(1.5, 0);
    pyramidBig.applyMatrix( new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 1, 0, -1 ).normalize(), Math.atan( Math.sqrt(2)) ) );
    const pyramidSmall = new THREE.TetrahedronBufferGeometry(1, 0);
    pyramidSmall.applyMatrix( new THREE.Matrix4().makeRotationAxis( new THREE.Vector3( 1, 0, -1 ).normalize(), Math.atan( Math.sqrt(2)) ) );

    const sagradaFamiliaOut = new THREE.CylinderBufferGeometry( 0.1, 0.8, 6, 64);
    const sagradaFamiliaMid = new THREE.CylinderBufferGeometry( 0.1, 0.8, 7, 64);
    const sagradaFamiliaIn = new THREE.CylinderBufferGeometry( 0.1, 0.8, 4.5, 64);
    const sagradaFamiliaTop = new THREE.SphereBufferGeometry(0.2, 64, 64);

    const notreDameDeParisOut = new THREE.BoxBufferGeometry(1.5, 7, 1.5);
    const notreDameDeParisMid = new THREE.BoxBufferGeometry(1.5, 5, 1.5);
    const notreDameDeParisCir = new THREE.CircleBufferGeometry(0.5, 16);
    const notreDameDeParisStripOut = new THREE.PlaneBufferGeometry(0.2, 6.5);
    const notreDameDeParisStripIn = new THREE.PlaneBufferGeometry(0.2, 2);
    const notreDameDeParisStripTop = new THREE.PlaneBufferGeometry(4.5, 0.15);
    const notreDameDeParisStripBottom = new THREE.PlaneBufferGeometry(4.3, 0.8);

    const acropolisOfAthensBase = new THREE.BoxBufferGeometry(9, 0.5, 4.5);
    const acropolisOfAthensPillar = new THREE.CylinderBufferGeometry(0.15, 0.15, 3, 64);
    const acropolisOfAthensTopL = new THREE.BoxBufferGeometry(8, 0.5, 0.5);
    const acropolisOfAthensTopS = new THREE.BoxBufferGeometry(0.5, 0.5, 4);

    return {
        torreDiPisaBodyBottom,
        torreDiPisaBodyParts,
        torreDiPisaHead,
        pyramidBig,
        pyramidSmall,
        sagradaFamiliaOut,
        sagradaFamiliaMid,
        sagradaFamiliaIn,
        sagradaFamiliaTop,
        notreDameDeParisOut,
        notreDameDeParisMid,
        notreDameDeParisCir,
        notreDameDeParisStripOut,
        notreDameDeParisStripIn,
        notreDameDeParisStripTop,
        acropolisOfAthensBase,
        acropolisOfAthensPillar,
        acropolisOfAthensTopL,
        acropolisOfAthensTopS,
        notreDameDeParisStripBottom,
    };
}

function createMaterials() {
    const loader = new THREE.TextureLoader();
    const pyramidTexture = new THREE.MeshBasicMaterial({
        map: loader.load('assets/pyramid-texture.jpg'),
        color: 0xb3b3b3,
    });
    // https://unsplash.com/photos/UlDeg0eSJbQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
    
    const stoneTexture = new THREE.MeshBasicMaterial({
        map: loader.load('assets/stone.jpg'),
    });
    // https://unsplash.com/photos/f_iJ4iHMXmw?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
    
    const rockTexture = new THREE.MeshBasicMaterial({
        map: loader.load('assets/rock.jpg'),
        color: 0xb3b3b3,
    });
    // https://unsplash.com/photos/ztsdXeryWps?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
    
    const lightRockTexture = new THREE.MeshBasicMaterial({
        map: loader.load('assets/light-rock.jpg'),
        color: 0xF9E4C8,
    });
    // https://unsplash.com/photos/Md6_qA-BMis?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
    
    const darkRockTexture = new THREE.MeshBasicMaterial({
        map: loader.load('assets/dark-rock.jpg'),
        color: 0xF9E4C8,
    });
    // https://unsplash.com/photos/u4ijcCaprRc?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
    
    const redRockTexture = new THREE.MeshBasicMaterial({
        map: loader.load('assets/red-rock.jpg'),
        color: 0xF5C6A5,
    });
    // https://unsplash.com/photos/toPZmF6D9dg?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink

    return {
        pyramidTexture,
        stoneTexture,
        rockTexture,
        lightRockTexture,
        darkRockTexture,
        redRockTexture,
    }
}

function createMeshes() {
    artwork = new THREE.Group();
    scene.add(artwork);
    
    const notreDameDeParisGroup = createNotreDameDeParis();
    notreDameDeParisGroup.position.set(-13, 2, -6);

    const pyramidGroup = createPyramid();
    pyramidGroup.position.set(-9, -2, 2);
    pyramidGroup.rotation.y = Math.PI / 180 * 45;
    
    const acropolisOfAthensGroup = createAcropolisOfAthensMesh();
    acropolisOfAthensGroup.position.set(-2, -1, -9);
    acropolisOfAthensGroup.rotation.y = Math.PI / 180 * 45;

    const torreDiPisaGroup = createTorreDiPisa();
    torreDiPisaGroup.position.set(4, -2, 1.5);
    
    const sagradaFamiliaGroup = createSagradaFamiliaGroup();
    sagradaFamiliaGroup.position.set(12, 2, -5);
    sagradaFamiliaGroup.rotation.y = Math.PI / 180 * (-20);
    
    artwork.add(
        torreDiPisaGroup,
        pyramidGroup,
        sagradaFamiliaGroup,
        notreDameDeParisGroup,
        acropolisOfAthensGroup,
    );
}

function createTorreDiPisa() {
    const geometries = createGeometries();
    const materials = createMaterials();

    const torreDiPisaBodyBottom = new THREE.Mesh(geometries.torreDiPisaBodyBottom, materials.rockTexture);
    const torreDiPisaBodyParts1 = new THREE.Mesh(geometries.torreDiPisaBodyParts, materials.rockTexture);
    torreDiPisaBodyParts1.position.y = 1.4;
    const torreDiPisaBodyParts2 = new THREE.Mesh(geometries.torreDiPisaBodyParts, materials.rockTexture);
    torreDiPisaBodyParts2.position.y = 2.2;
    const torreDiPisaBodyParts3 = new THREE.Mesh(geometries.torreDiPisaBodyParts, materials.rockTexture);
    torreDiPisaBodyParts3.position.y = 3;
    const torreDiPisaBodyParts4 = new THREE.Mesh(geometries.torreDiPisaBodyParts, materials.rockTexture);
    torreDiPisaBodyParts4.position.y = 3.8;
    const torreDiPisaBodyParts5 = new THREE.Mesh(geometries.torreDiPisaBodyParts, materials.rockTexture);
    torreDiPisaBodyParts5.position.y = 4.6;
    const torreDiPisaBodyParts6 = new THREE.Mesh(geometries.torreDiPisaBodyParts, materials.rockTexture);
    torreDiPisaBodyParts6.position.y = 5.4;
    const torreDiPisaHead = new THREE.Mesh(geometries.torreDiPisaHead, materials.rockTexture);
    torreDiPisaHead.position.y = 6.1;
    const torreDiPisaBodyGroup = new THREE.Group();
    torreDiPisaBodyGroup.add(
        torreDiPisaBodyBottom,
        torreDiPisaBodyParts1, 
        torreDiPisaBodyParts2, 
        torreDiPisaBodyParts3, 
        torreDiPisaBodyParts4,
        torreDiPisaBodyParts5,
        torreDiPisaBodyParts6
    );
    const torreDiPisaGroup = new THREE.Group();
    torreDiPisaGroup.add(torreDiPisaBodyGroup, torreDiPisaHead);
    torreDiPisaGroup.rotation.z = Math.PI / 180 * 10;
    torreDiPisaGroup.rotation.y = Math.PI / 180 * 180;
    torreDiPisaGroup.position.z = 4;

    return torreDiPisaGroup;
}

function createPyramid() {
    const geometries = createGeometries();
    const materials = createMaterials();

    const pyramidBig = new THREE.Mesh(geometries.pyramidBig, materials.pyramidTexture);
    pyramidBig.position.x = -0.5;
    pyramidBig.position.z = -1;
    const pyramidSmall = new THREE.Mesh(geometries.pyramidSmall, materials.pyramidTexture);
    pyramidSmall.position.z = 0.75;
    const pyramidGroup = new THREE.Group();
    pyramidGroup.add(pyramidBig, pyramidSmall);
    
    return pyramidGroup;
}

function createSagradaFamiliaGroup() {
    const geometries = createGeometries();
    const materials = createMaterials();

    const sagradaFamiliaOutLeft = new THREE.Mesh(geometries.sagradaFamiliaOut, materials.redRockTexture);
    sagradaFamiliaOutLeft.position.x = -2;
    sagradaFamiliaOutLeft.position.y = -0.5;
    sagradaFamiliaOutLeft.rotation.y = Math.PI / 180 * 45;

    const sagradaFamiliaOutLeftTop = new THREE.Mesh(geometries.sagradaFamiliaTop, materials.redRockTexture);
    sagradaFamiliaOutLeftTop.position.x = -2;
    sagradaFamiliaOutLeftTop.position.y = 2.5;

    const sagradaFamiliaOutRight = new THREE.Mesh(geometries.sagradaFamiliaOut, materials.redRockTexture);
    sagradaFamiliaOutRight.position.x = 2;
    sagradaFamiliaOutRight.position.y = -0.5;
    sagradaFamiliaOutRight.rotation.y = Math.PI / 180 * 180;

    const sagradaFamiliaOutRightTop = new THREE.Mesh(geometries.sagradaFamiliaTop, materials.redRockTexture);
    sagradaFamiliaOutRightTop.position.x = 2;
    sagradaFamiliaOutRightTop.position.y = 2.5;

    const sagradaFamiliaMidLeft = new THREE.Mesh(geometries.sagradaFamiliaMid, materials.redRockTexture);
    sagradaFamiliaMidLeft.position.x = -1;
    sagradaFamiliaMidLeft.rotation.y = Math.PI / 180 * 30;

    const sagradaFamiliaMidLeftTop = new THREE.Mesh(geometries.sagradaFamiliaTop, materials.redRockTexture);
    sagradaFamiliaMidLeftTop.position.x = -1;
    sagradaFamiliaMidLeftTop.position.y = 3.5;

    const sagradaFamiliaMidRight = new THREE.Mesh(geometries.sagradaFamiliaMid, materials.redRockTexture);
    sagradaFamiliaMidRight.position.x = 1;
    sagradaFamiliaMidRight.rotation.y = Math.PI / 180 * 75;

    const sagradaFamiliaMidRightTop = new THREE.Mesh(geometries.sagradaFamiliaTop, materials.redRockTexture);
    sagradaFamiliaMidRightTop.position.x = 1;
    sagradaFamiliaMidRightTop.position.y = 3.5;

    const sagradaFamiliaIn = new THREE.Mesh(geometries.sagradaFamiliaIn, materials.redRockTexture);
    sagradaFamiliaIn.position.y = -1.25;
    sagradaFamiliaIn.rotation.y = Math.PI / 180 * 90;

    const sagradaFamiliaInTop = new THREE.Mesh(geometries.sagradaFamiliaTop, materials.redRockTexture);
    sagradaFamiliaInTop.position.y = 1;
    
    const sagradaFamiliaGroup = new THREE.Group();
    sagradaFamiliaGroup.add(
        sagradaFamiliaOutLeft, 
        sagradaFamiliaOutLeftTop,
        sagradaFamiliaOutRight,
        sagradaFamiliaOutRightTop,
        sagradaFamiliaMidLeft,
        sagradaFamiliaMidLeftTop,
        sagradaFamiliaMidRight,
        sagradaFamiliaMidRightTop,
        sagradaFamiliaIn,
        sagradaFamiliaInTop,
    );

    return sagradaFamiliaGroup;
}

function createNotreDameDeParis() {
    const geometries = createGeometries();
    const materials = createMaterials();

    const notreDameDeParisOutLeft = new THREE.Mesh(geometries.notreDameDeParisOut, materials.lightRockTexture);
    notreDameDeParisOutLeft.position.x = -1.5;
    notreDameDeParisOutLeft.position.y = 1;
    const notreDameDeParisOutRight = new THREE.Mesh(geometries.notreDameDeParisOut, materials.lightRockTexture);
    notreDameDeParisOutRight.position.x = 1.5;
    notreDameDeParisOutRight.position.y = 1;
    const notreDameDeParisMid = new THREE.Mesh(geometries.notreDameDeParisMid, materials.lightRockTexture);
    const notreDameDeParisCir = new THREE.Mesh(geometries.notreDameDeParisCir, materials.darkRockTexture);
    notreDameDeParisCir.position.y = 0.9;
    notreDameDeParisCir.position.z = 0.76;
    const notreDameDeParisStrip1 = new THREE.Mesh(geometries.notreDameDeParisStripOut, materials.darkRockTexture);
    notreDameDeParisStrip1.position.x = -1.7;
    notreDameDeParisStrip1.position.y = 0.75;
    notreDameDeParisStrip1.position.z = 0.76;
    const notreDameDeParisStrip2 = new THREE.Mesh(geometries.notreDameDeParisStripOut, materials.darkRockTexture);
    notreDameDeParisStrip2.position.x = -1.3;
    notreDameDeParisStrip2.position.y = 0.75;
    notreDameDeParisStrip2.position.z = 0.76;
    const notreDameDeParisStrip3 = new THREE.Mesh(geometries.notreDameDeParisStripOut, materials.darkRockTexture);
    notreDameDeParisStrip3.position.x = 1.7;
    notreDameDeParisStrip3.position.y = 0.75;
    notreDameDeParisStrip3.position.z = 0.76;
    const notreDameDeParisStrip4 = new THREE.Mesh(geometries.notreDameDeParisStripOut, materials.darkRockTexture);
    notreDameDeParisStrip4.position.x = 1.3;
    notreDameDeParisStrip4.position.y = 0.75;
    notreDameDeParisStrip4.position.z = 0.76;
    const notreDameDeParisStripS1 = new THREE.Mesh(geometries.notreDameDeParisStripIn, materials.darkRockTexture);
    notreDameDeParisStripS1.position.x = -0.3;
    notreDameDeParisStripS1.position.y = -1.5;
    notreDameDeParisStripS1.position.z = 0.76;
    const notreDameDeParisStripS2 = new THREE.Mesh(geometries.notreDameDeParisStripIn, materials.darkRockTexture);
    notreDameDeParisStripS2.position.x = 0.3;
    notreDameDeParisStripS2.position.y = -1.5;
    notreDameDeParisStripS2.position.z = 0.76;
    const notreDameDeParisStripTop1 = new THREE.Mesh(geometries.notreDameDeParisStripTop, materials.darkRockTexture);
    notreDameDeParisStripTop1.position.y = 2.4;
    notreDameDeParisStripTop1.position.z = 0.76;
    const notreDameDeParisStripTop2 = new THREE.Mesh(geometries.notreDameDeParisStripTop, materials.darkRockTexture);
    notreDameDeParisStripTop2.position.y = 1.7;
    notreDameDeParisStripTop2.position.z = 0.76;
    const notreDameDeParisStripBottom = new THREE.Mesh(geometries.notreDameDeParisStripBottom, materials.darkRockTexture);
    notreDameDeParisStripBottom.position.y = -0.1;
    notreDameDeParisStripBottom.position.z = 0.76;


    const notreDameDeParisGroup = new THREE.Group();
    notreDameDeParisGroup.add(
        notreDameDeParisOutLeft,
        notreDameDeParisOutRight,
        notreDameDeParisMid,
        notreDameDeParisCir,
        notreDameDeParisStrip1,
        notreDameDeParisStrip2,
        notreDameDeParisStrip3,
        notreDameDeParisStrip4,
        notreDameDeParisStripS1,
        notreDameDeParisStripS2,
        notreDameDeParisStripTop1,
        notreDameDeParisStripTop2,
        notreDameDeParisStripBottom,
    );
    
    return notreDameDeParisGroup;
}

function createAcropolisOfAthensMesh() {
    const geometries = createGeometries();
    const materials = createMaterials();
    
    const acropolisOfAthensBase = new THREE.Mesh(geometries.acropolisOfAthensBase, materials.stoneTexture);
    acropolisOfAthensBase.position.z = 0.25;
    const acropolisOfAthensPillar1 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar1.position.set(-4, 1.5, 2);
    const acropolisOfAthensPillar2 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar2.position.set(-3.5, 1.5, 2);
    const acropolisOfAthensPillar3 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar3.position.set(-3, 1.5, 2);
    const acropolisOfAthensPillar4 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar4.position.set(-2.5, 1.5, 2);
    const acropolisOfAthensPillar5 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar5.position.set(-2, 1.5, 2);
    const acropolisOfAthensPillar6 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar6.position.set(-1.5, 1.5, 2);
    const acropolisOfAthensPillar7 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar7.position.set(-1, 1.5, 2);
    const acropolisOfAthensPillar8 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar8.position.set(-0.5, 1.5, 2);
    const acropolisOfAthensPillar9 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar9.position.set(0, 1.5, 2);
    const acropolisOfAthensPillar10 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar10.position.set(0.5, 1.5, 2);
    const acropolisOfAthensPillar11 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar11.position.set(1, 1.5, 2);
    const acropolisOfAthensPillar12 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar12.position.set(1.5, 1.5, 2);
    const acropolisOfAthensPillar13 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar13.position.set(2, 1.5, 2);
    const acropolisOfAthensPillar14 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar14.position.set(2.5, 1.5, 2);
    const acropolisOfAthensPillar15 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar15.position.set(3, 1.5, 2);
    const acropolisOfAthensPillar16 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar16.position.set(3.5, 1.5, 2);
    const acropolisOfAthensPillar17 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar17.position.set(4, 1.5, 2);
    const acropolisOfAthensPillar18 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar18.position.set(4, 1.5, 1.5);
    const acropolisOfAthensPillar19 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar19.position.set(4, 1.5, 1);
    const acropolisOfAthensPillar20 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar20.position.set(4, 1.5, 0.5);
    const acropolisOfAthensPillar21 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar21.position.set(4, 1.5, 0);
    const acropolisOfAthensPillar22 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar22.position.set(4, 1.5, -0.5);
    const acropolisOfAthensPillar23 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar23.position.set(4, 1.5, -1);
    const acropolisOfAthensPillar24 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar24.position.set(4, 1.5, -1.5);
    const acropolisOfAthensPillar25 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar25.position.set(3.5, 1.5, -1.5);
    const acropolisOfAthensPillar26 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar26.position.set(3, 1.5, -1.5);
    const acropolisOfAthensPillar27 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar27.position.set(2.5, 1.5, -1.5);
    const acropolisOfAthensPillar28 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar28.position.set(2, 1.5, -1.5);
    const acropolisOfAthensPillar29 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar29.position.set(1.5, 1.5, -1.5);
    const acropolisOfAthensPillar30 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar30.position.set(1, 1.5, -1.5);
    const acropolisOfAthensPillar31 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar31.position.set(0.5, 1.5, -1.5);
    const acropolisOfAthensPillar32 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar32.position.set(0, 1.5, -1.5);
    const acropolisOfAthensPillar33 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar33.position.set(-0.5, 1.5, -1.5);
    const acropolisOfAthensPillar34 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar34.position.set(-1, 1.5, -1.5);
    const acropolisOfAthensPillar35 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar35.position.set(-1.5, 1.5, -1.5);
    const acropolisOfAthensPillar36 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar36.position.set(-2, 1.5, -1.5);
    const acropolisOfAthensPillar37 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar37.position.set(-2.5, 1.5, -1.5);
    const acropolisOfAthensPillar38 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar38.position.set(-3, 1.5, -1.5);
    const acropolisOfAthensPillar39 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar39.position.set(-3.5, 1.5, -1.5);
    const acropolisOfAthensPillar40 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar40.position.set(-4, 1.5, -1.5);
    const acropolisOfAthensPillar41 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar41.position.set(-4, 1.5, -1);
    const acropolisOfAthensPillar42 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar42.position.set(-4, 1.5, -0.5);
    const acropolisOfAthensPillar43 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar43.position.set(-4, 1.5, 0);
    const acropolisOfAthensPillar44 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar44.position.set(-4, 1.5, 0.5);
    const acropolisOfAthensPillar45 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar45.position.set(-4, 1.5, 1);
    const acropolisOfAthensPillar46 = new THREE.Mesh(geometries.acropolisOfAthensPillar, materials.stoneTexture);
    acropolisOfAthensPillar46.position.set(-4, 1.5, 1.5);
    const acropolisOfAthensTopL1 = new THREE.Mesh(geometries.acropolisOfAthensTopL, materials.stoneTexture);
    acropolisOfAthensTopL1.position.y = 3;
    acropolisOfAthensTopL1.position.z = 2;
    const acropolisOfAthensTopL2 = new THREE.Mesh(geometries.acropolisOfAthensTopL, materials.stoneTexture);
    acropolisOfAthensTopL2.position.y = 3;
    acropolisOfAthensTopL2.position.z = -1.5;
    const acropolisOfAthensTopS1 = new THREE.Mesh(geometries.acropolisOfAthensTopS, materials.stoneTexture);
    acropolisOfAthensTopS1.position.set(-4, 3, 0.25);
    const acropolisOfAthensTopS2 = new THREE.Mesh(geometries.acropolisOfAthensTopS, materials.stoneTexture);
    acropolisOfAthensTopS2.position.set(4, 3, 0.25);

    acropolisOfAthensPillar3.rotation.y = Math.PI / 180 * 45;
    acropolisOfAthensPillar19.rotation.y = Math.PI / 180 * 45;
    acropolisOfAthensPillar22.rotation.y = Math.PI / 180 * 45;
    acropolisOfAthensPillar37.rotation.y = Math.PI / 180 * 45;
    acropolisOfAthensPillar46.rotation.y = Math.PI / 180 * 45;
    acropolisOfAthensPillar2.rotation.y = Math.PI / 180 * 90;
    acropolisOfAthensPillar5.rotation.y = Math.PI / 180 * 90;
    acropolisOfAthensPillar12.rotation.y = Math.PI / 180 * 90;
    acropolisOfAthensPillar33.rotation.y = Math.PI / 180 * 90;
    acropolisOfAthensPillar42.rotation.y = Math.PI / 180 * 90;
    acropolisOfAthensPillar18.rotation.y = Math.PI / 180 * 90;
    acropolisOfAthensPillar28.rotation.y = Math.PI / 180 * 90;
    acropolisOfAthensPillar5.rotation.y = Math.PI / 180 * 180;
    acropolisOfAthensPillar14.rotation.y = Math.PI / 180 * 180;
    acropolisOfAthensPillar20.rotation.y = Math.PI / 180 * 180;
    acropolisOfAthensPillar27.rotation.y = Math.PI / 180 * 180;
    acropolisOfAthensPillar31.rotation.y = Math.PI / 180 * 180;
    acropolisOfAthensPillar41.rotation.y = Math.PI / 180 * 180;

    acropolisOfAthensPillar1.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar5.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar8.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar13.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar19.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar24.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar26.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar30.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar33.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar37.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar40.rotation.z = Math.PI / 180 * 180;
    acropolisOfAthensPillar46.rotation.z = Math.PI / 180 * 180;

    const acropolisOfAthensGroup = new THREE.Group();
    acropolisOfAthensGroup.add(
        acropolisOfAthensBase,
        acropolisOfAthensPillar1,
        acropolisOfAthensPillar2,
        acropolisOfAthensPillar3,
        acropolisOfAthensPillar4,
        acropolisOfAthensPillar5,
        acropolisOfAthensPillar6,
        acropolisOfAthensPillar7,
        acropolisOfAthensPillar8,
        acropolisOfAthensPillar9,
        acropolisOfAthensPillar10,
        acropolisOfAthensPillar11,
        acropolisOfAthensPillar12,
        acropolisOfAthensPillar13,
        acropolisOfAthensPillar14,
        acropolisOfAthensPillar15,
        acropolisOfAthensPillar16,
        acropolisOfAthensPillar17,
        acropolisOfAthensPillar18,
        acropolisOfAthensPillar19,
        acropolisOfAthensPillar20,
        acropolisOfAthensPillar21,
        acropolisOfAthensPillar22,
        acropolisOfAthensPillar23,
        acropolisOfAthensPillar24,
        acropolisOfAthensPillar25,
        acropolisOfAthensPillar26,
        acropolisOfAthensPillar27,
        acropolisOfAthensPillar28,
        acropolisOfAthensPillar29,
        acropolisOfAthensPillar30,
        acropolisOfAthensPillar31,
        acropolisOfAthensPillar32,
        acropolisOfAthensPillar33,
        acropolisOfAthensPillar34,
        acropolisOfAthensPillar35,
        acropolisOfAthensPillar36,
        acropolisOfAthensPillar37,
        acropolisOfAthensPillar38,
        acropolisOfAthensPillar39,
        acropolisOfAthensPillar40,
        acropolisOfAthensPillar41,
        acropolisOfAthensPillar42,
        acropolisOfAthensPillar43,
        acropolisOfAthensPillar44,
        acropolisOfAthensPillar45,
        acropolisOfAthensPillar46,
        acropolisOfAthensTopL1,
        acropolisOfAthensTopL2,
        acropolisOfAthensTopS1,
        acropolisOfAthensTopS2
    );

    return acropolisOfAthensGroup;
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - (window.innerWidth / 2));
    mouseY = (event.clientY - (window.innerWidth / 2))
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
    renderer.render( scene, camera );
}

function update() {
    let factorX = .001;
    let factorY = .001;
    if ( artwork ) {
      artwork.rotation.y += 0.1 * ( factorX * mouseX - artwork.rotation.y );
	  artwork.rotation.x += 0.05 * ( factorY * mouseY - artwork.rotation.x );
	}
}

init();