let liftNumber = document.querySelector("#lifts");
let floorNumber = document.querySelector("#floor");
let finalPage = document.querySelector(".final_page")
let valueform = document.querySelector(".form");
let building = document.querySelector(".building");
let liftsData = [];
let liftRequestQueue = [];
let maxFloor;

function goBack(){
    valueform.classList.remove('hidden');
    finalPage.classList.add('hidden');
    building.innerHTML = '';
    liftsData = [];
    liftRequestQueue = [];

}

function formSubmitHandler(event){
    event.preventDefault();
    valueform.classList.add('hidden');
    finalPage.classList.remove('hidden');
    maxFloor = floorNumber.value;
    generateBuilding(Number(liftNumber.value), Number(floorNumber.value));
    defaultLiftData();

}


function generateBuilding(liftCount, floorCount) {
    for(let i = floorCount; i >= 0; i--){
        const floorElement = document.createElement('div');
        floorElement.classList.add('floor');
        floorElement.setAttribute('floor',i);

        let btn = document.createElement('div');
        btn.classList.add('btn');

        let up_btn = document.createElement('button');
        up_btn.innerText = "Up"
        let down_btn = document.createElement('button');
        down_btn.innerText = "Down"

        up_btn.classList.add('floor-btn','up_btn');
        down_btn.classList.add('floor-btn', 'down_btn');

        up_btn.setAttribute('floor', i);
        down_btn.setAttribute('floor', i);

        up_btn.onclick = (event) => addRequestToQueue(event);
        down_btn.onclick = (event) => addRequestToQueue(event);

        if (i !== floorCount) btn.appendChild(up_btn);
        if (i !== 0) btn.appendChild(down_btn);

        let floorLabel = document.createElement('h5');
        floorLabel.classList.add('floorLabel');
        floorLabel.textContent = `Floor ${i}`;

        floorElement.appendChild(btn);

        if (i === 0) {
            for (let lift = 1; lift <= liftCount; lift++) {
                let liftElement = document.createElement('div');
                liftElement.innerHTML = `
                    <div class="door left open"></div>
                    <div class="door right open"></div>
                `;
                liftElement.classList.add('lift');
                floorElement.appendChild(liftElement);
            }
        }

        floorElement.appendChild(floorLabel);
        building.appendChild(floorElement);
    }
}


function defaultLiftData(){
    let allLifts = document.querySelectorAll('.lift');
    for(let i = 0; i<allLifts.length; i++){
        liftsData.push({
            liftElement: allLifts[i],
            i: 0,
            isMoving: false
        })
    }
}


/********************************************* */
