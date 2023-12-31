function addRequestToQueue(event) {
    const newFloor = event.target.getAttribute('floor');

    for(let req in liftRequestQueue){
        if(liftRequestQueue[req].getAttribute('floor') === newFloor) {
            console.log("At this floor already");
            return;
        }
    }

    event.target.classList.toggle('btn_toggle');
    liftRequestQueue.push(event.target);
    processQueueRequest();
}

function chooseLift(nextFloor){
let notMovingLifts = liftsData.filter((lift) => lift.isMoving === false);
if(notMovingLifts.length === 0) return null;

notMovingLifts.sort((a, b) => {
    return Math.abs(nextFloor-a.floor) - Math.abs(nextFloor - b.floor);
})
return notMovingLifts[0];
}

function updateLiftData(liftElement, isMoving, floor){
for(let i = 0; i < liftsData.length; i++){
    if(liftsData[i].liftElement === liftElement){
        liftsData[i].isMoving = isMoving;
        liftsData[i].floor = floor;
    }
}
}

function processQueueRequest() {
if(liftRequestQueue.length === 0){
    console.log("No active requests");
    return;
}

let liftChoice = chooseLift(liftRequestQueue[0].getAttribute('floor'));
if(liftChoice === null){
    console.log("No free lifts");
    return setTimeout(() => {
        console.log("Calling again");
        processQueueRequest();
    }, 5000);
}

let {liftElement, floor: currFloor, isMoving} = chooseLift(liftRequestQueue[0].getAttribute('floor'));

let nextFloorElement = liftRequestQueue.shift();
const nextFloor = Number(nextFloorElement.getAttribute('floor'));

updateLiftData(liftElement, true, nextFloor);

const floorDiff = Math.abs(nextFloor - currFloor)
moveLift(floorDiff, nextFloor, liftElement);
setTimeout(() => {
    nextFloorElement.classList.toggle('btn_toggle');
    toggleLiftDoor(liftElement);
    setTimeout(() => {
        toggleLiftDoor(liftElement);
        setTimeout(() => {
            updateLiftData(liftElement, false, nextFloor);
            processQueueRequest(); 
        }, 2500); 
    }, 2500); 
}, 2000*floorDiff); 
}

function toggleLiftDoor(liftElement){
let doors = liftElement.children;
for(let i = 0; i < doors.length; i++){
    doors[i].classList.toggle("open");
}
}
function moveLift(floorDiff, nextFloor, liftElement){
if(nextFloor > maxFloor || nextFloor < 0) return;
const liftHeight = liftElement.firstElementChild.offsetHeight;
liftElement.style.transform = `translateY(-${nextFloor * (liftHeight + 2)}px)`
liftElement.style.transition = `transform ${2 * floorDiff}s ease`;
}