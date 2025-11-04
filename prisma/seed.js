// prisma/seed.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * ========== BASE NODES ==========
 */
const nodes = [
  { code: "main_building", name: "Main Building", lat: 12.926739, lng: 77.526795, type: "building", building: "Academic Block & Administration", floor: null },
  { code: "library", name: "Library", lat: 12.927555, lng: 77.527363, type: "building", building: "Library with study area", floor: null },
  { code: "canteen", name: "Canteen", lat: 12.925434082158953, lng: 77.52629165299633, type: "dining", building: "Canteen & Food Court", floor: null },
  { code: "admin", name: "Admin Block", lat: 12.927096255900626, lng: 77.5266644681782, type: "building", building: "Principal Office & Admin Department", floor: null },
  { code: "physical_ed", name: "Physical Education Dept", lat: 12.925816084951286, lng: 77.5256072025667, type: "sports", building: "Playground & Sports Facilities", floor: null },
  { code: "main_entrance", name: "Main Entrance", lat: 12.925149, lng: 77.526612, type: "gate", building: "Global Main Entrance", floor: null },
  { code: "parking", name: "Parking Lot", lat: 12.924498319274573, lng: 77.52620597909112, type: "parking", building: "Parking Area", floor: null },
  { code: "girls_hostel", name: "Girls Hostel", lat: 12.923551832733342, lng: 77.52767181614504, type: "hostel", building: "Girls Hostel", floor: null },
  { code: "boys_hostel", name: "Boys Hostel", lat: 12.923339757965628, lng: 77.52826588105283, type: "hostel", building: "Boys Hostel", floor: null },
  { code: "cricket_ground", name: "Cricket Ground", lat: 12.926341570762668, lng: 77.52573912178504, type: "sports", building: "Cricket Ground", floor: null },
  { code: "basketball_court", name: "Basketball Court", lat: 12.925785239471097, lng: 77.52648074851497, type: "sports", building: "Basketball Court", floor: null },
  { code: "volleyball_court", name: "Volleyball Court", lat: 12.925760404156964, lng: 77.52627287731568, type: "sports", building: "Volleyball Court", floor: null },
  { code: "auditorium", name: "Auditorium", lat: 12.927594289430477, lng: 77.52711911426056, type: "building", building: "Auditorium", floor: null },
  { code: "aib_block", name: "AIB Block", lat: 12.926815249290375, lng: 77.52708826885693, type: "building", building: "AIB Block", floor: null },
  { code: "a_block", name: "A Block", lat: 12.92746488528009, lng: 77.5273605130726, type: "building", building: "A Block", floor: null },
  { code: "b_block", name: "B Block", lat: 12.927535469370188, lng: 77.52715398297758, type: "building", building: "B Block", floor: null },
  { code: "c_block", name: "C Block", lat: 12.92790538196081, lng: 77.52719958053099, type: "building", building: "C Block", floor: null },
  { code: "quadrangle", name: "Quadrangle", lat: 12.926877990871688, lng: 77.52653036938116, type: "open_area", building: "Quadrangle", floor: null },
];

/**
 * ========== ROOMS / LABS ==========
 */
const roomDefs = {
  main_building: [
    // ground
    { code: "conference_room", name: "Conference Room", floor: 0, lat: 12.926967, lng: 77.52655 },
    { code: "principal_chamber", name: "Principal Chamber", floor: 0, lat: 12.927086, lng: 77.526581 },
    { code: "admission_department", name: "Admission Department", floor: 0, lat: 12.927078, lng: 77.526343 },
    // floor 2
    { code: "a_201", name: "A-201", floor: 2, lat: 12.927475, lng: 77.52731 },
    { code: "a_202", name: "A-202", floor: 2, lat: 12.927462, lng: 77.527325 },
    // floor 3
    { code: "a_301", name: "A-301", floor: 3, lat: 12.92749, lng: 77.5273 },
    { code: "a_302", name: "A-302", floor: 3, lat: 12.927498, lng: 77.527285 },
  ],
  aib_block: [
    { code: "cs_lab_1", name: "CS Lab 1", floor: 2, lat: 12.92684, lng: 77.52706, type: "lab" },
    { code: "cs_lab_2", name: "CS Lab 2", floor: 3, lat: 12.926855, lng: 77.52705, type: "lab" },
  ],
  b_block: [
    { code: "ece_lab", name: "ECE Lab", floor: 1, lat: 12.92754, lng: 77.52713, type: "lab" },
    { code: "b_204", name: "B-204", floor: 2, lat: 12.927545, lng: 77.527115 },
  ],
  c_block: [
    { code: "mech_lab", name: "Mechanical Lab", floor: 1, lat: 12.92789, lng: 77.52721, type: "lab" },
    { code: "c_102", name: "C-102", floor: 1, lat: 12.92788, lng: 77.52719 },
  ],
};

// add rooms to nodes
(function appendRoomsToNodes() {
  const byCodeBase = Object.fromEntries(nodes.map(n => [n.code, n]));
  for (const [buildingCode, rooms] of Object.entries(roomDefs)) {
    const buildingNode = byCodeBase[buildingCode];
    const buildingName = buildingNode?.name || buildingCode;
    rooms.forEach(r => {
      nodes.push({
        code: r.code,
        name: r.name,
        lat: r.lat,
        lng: r.lng,
        type: r.type || "room",
        building: buildingName,
        floor: r.floor ?? null,
      });
    });
  }
})();

/**
 * --- Geometry helpers (correct haversine) ---
 */
const toRad = d => (d * Math.PI) / 180;
function haversineMeters(a, b) {
  const R = 6371000;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * (Math.sin(dLng / 2) ** 2);
  return 2 * R * Math.asin(Math.sqrt(s));
}
const polyLen = coords =>
  Array.isArray(coords) && coords.length > 1
    ? coords.slice(1).reduce((L, p, i) => L + haversineMeters(coords[i], p), 0)
    : 0;

function edgesFootpaths(byCode) {
  const need = (code) => {
    const n = byCode[code];
    if (!n) throw new Error(`Missing node ${code}`);
    return { lat: n.lat, lng: n.lng };
  };
  const N = need;

  function midTowards(a, b, t = 0.4) {
    return { lat: a.lat + t * (b.lat - a.lat), lng: a.lng + t * (b.lng - a.lng) };
  }

  const E = [];

  // ===== outdoor examples (your existing list kept) =====
  E.push({
    from: "main_entrance", to: "main_building",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("main_entrance"),
      { lat: 12.925258521418684 ,lng: 77.52664060936388},
      { lat: 12.925376026993414, lng: 77.52667921698043 },
      { lat: 12.925638815036667, lng: 77.52675244703559 },
      { lat: 12.925974599364189, lng: 77.52687061371714 },
      { lat: 12.926300650377492, lng: 77.52688725691215 },
      { lat: 12.926569926018832, lng: 77.52693885081509 },
      { lat: 12.926824602109429, lng: 77.52690556442697 },
      N("main_building")
    ]
  });

  E.push({
    from: "main_building", to: "admin",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("main_building"),
      { lat: 12.926829378543808, lng: 77.52684731324678 },
      { lat: 12.926835394078934, lng: 77.52671770221583 },
      { lat: 12.927013854888411, lng: 77.52669095708247 },
      { lat: 12.92713617065575,  lng: 77.52667244122046 },
      N("admin")
    ]
  });

  E.push({
    from: "admin", to: "library",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("admin"),
      { lat: 12.92714018100758,  lng: 77.52666832658454 },
      { lat: 12.926987787592427, lng: 77.52669918635382 },
      { lat: 12.926807321585736, lng: 77.52671564489744 },
      { lat: 12.926827373370703, lng: 77.52687611569765 },
      { lat: 12.926837399262583, lng: 77.52692137669258 },
      { lat: 12.927146196535224, lng: 77.52690491814897 },
      { lat: 12.927409745819011, lng: 77.5268997630143  },
      { lat: 12.927443660348928, lng: 77.52712427302845 },
      N("library")
    ]
  });
  E.push({
    from: "main_building", to: "cricket_ground",
     type: "footpath", bidirectional: true, accessible: true,
     pathCoords: [ N("main_building"),
     { lat:12.926799140124679,lng: 77.52692993772348},
     { lat:12.926799140124679,lng: 77.52692993772348},
     { lat:12.926536794372389,lng: 77.52694702770458},
     { lat:12.926024594728068,lng: 77.52688294027541},
     { lat:12.925749755461295,lng: 77.5267932178746},
     { lat:12.925524886745256,lng: 77.526737675436},
     { lat:12.925374974155364,lng: 77.52667358800683},
     { lat:12.92541245231127, lng: 77.52648132571935},
     { lat:12.925474915891954,lng: 77.52628051844131},
     { lat:12.925562364878658,lng: 77.52610534613495},
     { lat:12.925874682438254,lng: 77.526075438668},
     { lat:12.926195328059613,lng: 77.52605407619163},
     { lat:12.926549287033511,lng: 77.52600280624829},
     { lat:12.926799140124679,lng: 77.52594726380968},
     { lat:12.927078142447613,lng: 77.52590026636165},
     { lat:12.927875695981548,lng: 77.52576918646898},
    N("cricket_ground")
    ]
  });

  E.push({
    from:"main_building", to:"basketball_court",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [ N("main_building"),
    { lat:12.926784291635101,lng: 77.52693048770811},
    { lat:12.926549809950338,lng: 77.52694875950199},
    { lat:12.926294551157037,lng: 77.52690917061526},
    { lat:12.92608678217911, lng:77.52690612531627},
    { lat:12.925911662477708,lng: 77.52685435523362},
    { lat:12.925727638252338,lng: 77.52681781164586},
    { lat:12.92573654265346,lng: 77.52667468259384},
    { lat:12.925742478920704,lng: 77.5265285082428},
    N("basketball_court")
    ] 
  });

  E.push({
     from:"main_building", to:"auditorium",
     type: "footpath", bidirectional: true, accessible: true,
     pathCoords: [ N("main_building"),
     { lat:12.926778355408798,lng:77.52693353302783},
     { lat:12.92701580499736,lng:77.52693353302783},
     { lat:12.927184987691419,lng:77.52692135183192},
     { lat:12.927363074613895,lng:77.52688785354314},
     { lat:12.927609427980574,lng:77.5271619304513},
     N("auditorium")
     ]
  });

  E.push({
    from:"library", to:"canteen",
    type: "footpath", bidirectional: true, accessible: true,
     pathCoords: [ N("library"),
     { lat:12.927416500659175,lng: 77.52690612535726},
     { lat:12.927226541311331,lng: 77.5269122159552},
     { lat:12.927226541311331,lng: 77.5269122159552},
     { lat:12.926855526543171,lng: 77.526945714244},
     { lat:12.926582459321514,lng: 77.52694875954296},
     { lat:12.926450968207021,lng: 77.52696778706536},
     { lat:12.92617471500688,lng: 77.52688992006944},
     { lat:12.925983462612319,lng: 77.52687434667025},
     { lat:12.925707208887491,lng: 77.52679959434876},
     { lat:12.925500777335582,lng: 77.52672795670955},
     { lat:12.92535809660645,lng: 77.52668123651199},
     { lat:12.925373275411287,lng: 77.5265566493185},
     N("canteen")
     ]
  });


  E.push({
    from: "main_building", to: "library",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("main_building"),
      { lat:12.926829958179468,lng: 77.5268410529085 },
      { lat:12.926860608627559,lng: 77.52692908589322},
      { lat:12.926971633796668,lng: 77.52692655451243},
      { lat:12.927080191692045,lng: 77.52692149175085},
      { lat:12.927270167895367,lng: 77.52690124070462},
      { lat:12.92734911900227, lng:77.52689870932385},
      { lat:12.927413266758245,lng: 77.5269417427971},
      { lat:12.92743547174685, lng:77.52707084321693},
      { lat:12.927447807850779,lng:77.52719488087519},
      { lat:12.927566234417496,lng:77.52716956706738},
      { lat:12.9276797264912,lng:77.5271543787827},
      N("library")
    ]
  });

  E.push({
    from: "main_building", to: "canteen",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("main_building"),
      { lat:12.926836326109695,lng:77.52686156415488},
      { lat:12.926831054595302,lng:77.5269372843698},
      { lat:12.926588564812752,lng:77.52696973589049},
      { lat:12.92645100875128,lng:77.52695346118955},
      { lat:12.926127164821269,lng:77.52688276673283},
      { lat:12.92589289448238,lng:77.52684741950448},
      { lat:12.925675849707492,lng:77.52676965560207},
      { lat:12.925489811178855,lng:77.52669542642252},
      { lat:12.925362340255107,lng:77.52667421808552},
      { lat:12.92538301122013, lng:77.52655050278625},
      { lat:12.925455359584253,lng:77.52637376664444},
      { lat:12.925481562580499,lng:77.52629508933495},
      N("canteen")
    ]
  });
  E.push({
    from:"main_entrance", to:"library",
    type: "footpath", bidirectional: true, accessible: true,
     pathCoords: [ N("main_entrance"),
     { lat:12.925267841791108,lng:77.526635912712},
     { lat:12.925385640520885,lng:77.526658225522},
     { lat:12.925452695158562,lng:77.52668797593547},
     { lat:12.92557913378676,lng:77.52674479463113},
     { lat:12.925769787603208,lng:77.52679449890597},
     { lat:12.925893243690377,lng:77.52684420318093},
     { lat:12.926049517126092,lng:77.52687466709195},
     { lat:12.926199539533476,lng:77.5268955108217},
     { lat:12.926492220728987,lng:77.52697489147607},
     { lat:12.926782203678354,lng:77.52694453198848},
     { lat:12.926983416139144,lng:77.5269263162959},
     { lat:12.927193505447189,lng:77.52691720844962},
     { lat:12.92736808656864,lng:77.5268959568083},
     {lat:12.927569298557168,lng:77.52729670204471},
     N("library")
     ]
  });

  E.push({
     from:"main_entrance", to:"physical_ed",
     type: "footpath", bidirectional: true, accessible: true,
     pathCoords: [ N("main_entrance"),
     { lat:12.925285986944811,lng:77.52664361163943},
     { lat:12.925345479498986,lng:77.52664750775439},
     { lat:12.925357743213288,lng:77.52656845300679},
     { lat:12.925424002958167,lng:77.52641305442498},
     { lat:12.925492042313053,lng:77.5262573285313},
     { lat:12.925504254502991,lng:77.52618573041926},
     { lat:12.92554089106922,lng:77.52611055240162},
     { lat:12.925568804639894,lng:77.52604253419518},
     { lat:12.925612419587795,lng:77.52593692697994},
     { lat:12.925649056138171,lng:77.52582058004786},
     { lat:12.925652545333152,lng:77.52579194080306},
     { lat:12.925683948085885,lng:77.5256970733046},
     N("physical_ed")
     ]
  });

  E.push({
    from:"main_entrance", to:"basketball_court",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [ N("main_entrance"),
    {lat:12.925263499792498,lng:77.52664037843584},
    {lat:12.925350729787377,lng:77.52667438753907},
    {lat:12.92542051376135,lng:77.52670481673668},
    {lat:12.925537401874045,lng:77.5267424057455},
    {lat:12.9256455669445,lng:77.52676388517911},
    {lat:12.92568743728177,lng:77.52663500857743},
    {lat:12.925732796805923,lng:77.52650971188137},
    N("basketball_court")
    ]
  });

  E.push({
    from:"main_entrance", to:"auditorium",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [ N("main_entrance"),
    { lat:12.925286242129085,lng: 77.52664342698252},
    { lat:12.92547351660798,lng: 77.52672504522793},
    { lat:12.925691955160232,lng: 77.52678764474958},
    { lat:12.925864971249766,lng: 77.52683928523805},
    { lat:12.926034841475552,lng: 77.52689415325706},
    { lat:12.926267626421396,lng: 77.52689738078844},
    { lat:12.926487828193233,lng: 77.52695547633769},
    { lat:12.926802750297261,lng: 77.5269443530252},
    { lat:12.927028067596599,lng: 77.52691754999165},
    { lat:12.927237057370718,lng: 77.52690414847451},
    { lat:12.927354614044214,lng: 77.52690749885464},
    { lat:12.92753094894699,lng: 77.52733299702389},
    N("auditorium")
    ]
  });

  E.push({
    from: "main_entrance", to: "canteen",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("main_entrance"),
      { lat:12.925261728437501,lng: 77.52662914746317},
      {lat:12.925302902857183,lng: 77.52662713580523},
      {lat:12.925338195210474,lng: 77.52654666953407},
      {lat:12.925364991252511,lng: 77.52646620326466},
      {lat:12.9254087799004,lng: 77.52636830263697},
      N("canteen")
    ]
  });

  E.push({
    from: "main_building", to: "physical_ed",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("main_building"),
      { lat:12.926828294947299,lng:77.52692381447432},
      { lat:12.926719017050928,lng:77.52694827688036},
      { lat:12.92644880241084,lng:77.52694012274502 },
      { lat:12.926317668730096,lng:77.52692381447432 },
      { lat:12.926333563725368,lng:77.5269340071435},
      { lat:12.926252121329483,lng:77.52687369710243},
      { lat:12.926219607057849,lng:77.52687995203532},
      { lat:12.925806756962082,lng:77.52680767384727},
      { lat:12.925606553704267,lng:77.52675143115238},
      { lat:12.925461167904524,lng:77.526714751134},
      { lat:12.92536344953252,lng:77.5266585084391},
      { lat:12.925390,lng:77.526561},
      { lat:12.925394433410705,lng:77.52653379637654},
      { lat:12.925475468150873,lng:77.52628681758597},
      { lat:12.92549930189297,lng:77.52625747357123},
      { lat:12.925532669128087,lng:77.5261621055234},
      { lat:12.925549352743976,lng:77.52611075349763},
      { lat:12.925581209032815,lng:77.52601078985502},
      { lat:12.925645358447918,lng:77.52589547008027},
      { lat:12.925704756372296,lng:77.52577485544344},
      N("physical_ed")
    ]
  });

  E.push({
    from: "canteen", to: "basketball_court",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("canteen"),
      { lat: 12.925444756295203,lng:77.52640271332861 },
      { lat: 12.925493330985251,lng: 77.52639187909428 },
      { lat:12.925557745233553,lng: 77.5264319657613},
      { lat:12.925613711698107,lng:77.52646880215804},
      N("basketball_court")
    ]
  });

  E.push({
    from: "admin", to: "auditorium",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("admin"),
      { lat: 12.927150592540517, lng:77.52668164239446},
      {lat:12.927009968203112,lng: 77.52670749622642},
      {lat:12.926815695142055,lng: 77.52671166619932},
      {lat:12.926818946575283,lng: 77.52685010929734},
      {lat:12.926830326591169, lng:77.52691933084658},
      {lat:12.926983956756688, lng:77.5269159948684},
      {lat:12.927236883956624, lng:77.52689746515469},
      {lat:12.92741002242506, lng:77.52691080906772},
      {lat:12.92741896384509, lng:77.5270158923835},
      {lat:12.927423028127093,lng: 77.52710929977547},
      {lat:12.927649814943605,lng: 77.52713181762908},
      N("auditorium")
    ]
  });

  E.push({
    from: "main_building", to: "aib_block",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [ N("main_building"), { lat:12.92682826242594,lng:77.52689087545653 }, { lat:12.92682826242594,lng:77.5269750859 }, N("aib_block") ]
  });

  E.push({
    from: "aib_block", to: "a_block",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("aib_block"),
      { lat:12.92684291890094, lng:77.52696305583663},
      { lat:12.927010002655235,lng:77.52693899570994 },
      { lat:12.927162429842307,lng:77.5269359881941},
      { lat:12.927725237111328,lng:77.5274081681807},
      N("a_block")
    ]
  });

  E.push({
    from: "aib_block", to: "b_block",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [
      N("aib_block"),
      { lat:12.92684291890094, lng:77.52696305583663},
      { lat:12.927010002655235,lng:77.52693899570994 },
      { lat:12.927162429842307,lng:77.5269359881941},
      { lat:12.927725237111328,lng:77.5274081681807},
      N("b_block")
    ]
  });

  E.push({
    from: "b_block", to: "c_block",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [ N("b_block"), { lat: 12.92772, lng: 77.52717 }, N("c_block") ]
  });

  E.push({
    from: "a_block", to: "c_block",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [ N("a_block"), { lat: 12.92768, lng: 77.52732 }, { lat: 12.92779, lng: 77.52726 }, N("c_block") ]
  });

  E.push({
    from: "quadrangle", to: "aib_block",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [ N("quadrangle"),
       { lat: 12.92688247807651,lng: 77.52654468545133},
       {lat:12.926819887996277,lng: 77.52662308094018},
       {lat:12.926830455153945,lng: 77.5267757019465},
       {lat:12.926820700854696,lng: 77.52694833882317},
       {lat:12.926826390862287,lng: 77.52706176208477},
        N("aib_block") ]
  });

  E.push({
    from: "quadrangle", to: "library",
    type: "footpath", bidirectional: true, accessible: true,
    pathCoords: [ N("quadrangle"), 
      { lat: 12.92688247807651,lng: 77.52654468545133},
       
        N("library") ]
  });

  // indoor: building ↔ each room/lab
  for (const [buildingCode, rooms] of Object.entries(roomDefs)) {
    const b = N(buildingCode);
    rooms.forEach((r) => {
      const roomNode = N(r.code);
      const mid = midTowards(b, roomNode, 0.4);
      E.push({
        from: buildingCode,
        to: r.code,
        type: "footpath",
        bidirectional: true,
        accessible: true,
        pathCoords: [ b, mid, roomNode ],
      });
    });
  }

  // add computed length
  return E.map(e => ({ ...e, lengthMeters: polyLen(e.pathCoords) }));
}

/**
 * MAIN
 */
async function main() {
  console.log("➡  Upserting nodes...");

  for (const n of nodes) {
    // Only keep fields that definitely exist in your Node model
    const base = { name: n.name, lat: n.lat, lng: n.lng };

    await prisma.node.upsert({
      where: { code: n.code },
      update: base,
      create: { code: n.code, ...base },
    });
  }

  console.log("🧹  Clearing old edges...");
  await prisma.edge.deleteMany();

  const allNodes = await prisma.node.findMany();
  const byCode = Object.fromEntries(allNodes.map(n => [n.code, n]));

  console.log("🛠  Creating footpath edges...");
  const edges = edgesFootpaths(byCode);

  for (const e of edges) {
    const fromNode = byCode[e.from];
    const toNode   = byCode[e.to];

    if (!fromNode || !toNode) {
      console.warn(`⚠️  Skipping edge ${e.from} -> ${e.to}: node not found`);
      continue;
    }

    await prisma.edge.create({
      data: {
        from: { connect: { id: fromNode.id } },
        to:   { connect: { id: toNode.id } },
        type: e.type,
        bidirectional: e.bidirectional,
        accessible: e.accessible,
        lengthMeters: e.lengthMeters,
        pathCoords: e.pathCoords
      }
    });
  }

  console.log(`✅ Seed complete: ${Object.keys(byCode).length} nodes, ${edges.length} edges.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
