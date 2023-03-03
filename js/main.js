// API call/fetch
const loaddata = async(limit, sorted) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools/`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayTech(data,limit, sorted);
    }
    catch(e){
        console.log(e);
    }
}

// sort the data gotten from the api and pass parameters to function depending on
// which button is clicked
const displayTech = (data, limit, sorted=false) =>{
    let sortedData = JSON.parse(JSON.stringify(data));
    sortedData.data.tools.sort((a,b) => Date.parse(a.published_in) - Date.parse(b.published_in));

    if(sorted){
        displayTechElements(sortedData,limit);
    }else{
        displayTechElements(data,limit);
    }
}

// creating div elemnts and showing data from api
const displayTechElements = (data, limit=6) => {
    const techContainer = document.getElementById('tech-container');
    let count = 0;
    data.data.tools.every(tech => {
        if(count < limit){
            // show features in an oredered list(was there a better way?)
            const listElements = [];
            for(let i=0; i < tech.features.length; i++){
                listElements[i] = `<li>${tech.features[i]}</li>`;
            }
            let featuresAll = listElements.join("");

            const techDiv = document.createElement('div');
            techDiv.classList.add('col');
            techDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${tech.image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        <ol>
                            ${featuresAll}
                        </ol>
                    </div>
                    <hr/>
                    <div class="d-flex justify-content-between card-body">
                        <div>
                            <h5 class="card-title">${tech.name}</h5>
                            <i class="bi bi-calendar-date"> ${tech.published_in}</i>
                        </div>
                        <div>
                            <i onclick="loadTechDetail(${tech.id})" class="fa fa-arrow-right fa-3x" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                        </div>
                    </div>
                </div>
            `;
            techContainer.appendChild(techDiv);
            count++;
            return true;
        }
        else{
            return false;
        }
    });
    document.getElementById("spinner").classList.add("d-none");
}

// initial load
loaddata();

// shomore button to show everything
document.getElementById("more").addEventListener("click", function(){
    document.getElementById("show-btn").classList.add("d-none");
    document.getElementById("spinner").classList.remove("d-none");
    const techDiv = document.getElementById("tech-container");
    techDiv.innerHTML = '';
    loaddata(12);

});

// sort button clicked
document.getElementById("sort").addEventListener("click", function(){
    document.getElementById("show-btn").classList.add("d-none");
    document.getElementById("spinner").classList.remove("d-none");
    const techDiv = document.getElementById("tech-container");
    techDiv.innerHTML = '';
    loaddata(12, true);
});

const loadTechDetail = async(id) => {
    id = id.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.data);
        displayTechDetail(data.data);
    }
    catch(e){
        console.log(e);
    }
}

const displayTechDetail = data => {
    modalimg = document.getElementById('mimg');
    modalimg.src = data.image_link[0];
    modalimg.alt = data.image_link[1];

    example_header = document.getElementById('exheader');
    example_para = document.getElementById('expara');
    if(data.input_output_examples != null){
        example_header.innerText = data.input_output_examples[0].input;
        example_para.innerText = data.input_output_examples[0].output;
    }else{
        example_header.innerText = 'Can You Give Any Example?';
        example_para.innerText = 'No! Not Yet! Take a break';
    }
    
    description = document.getElementById('description');
    description.innerText = data.description;
    
    pricing = document.getElementById('pricing');
    const listprices = [];
    const newData = {
        pricing : [
            {plan: 'Basic', price: 'Free of Cost'},
            {plan: 'Pro', price: 'Free of Cost'},
            {plan: 'Enterprise', price: 'Free of Cost'}
        ],
    }
    for(let i=0; i < data.pricing?.length; i++){
        if(data.pricing != null){
            listprices[i] = `<li class="bg-secondary m-1 p-2 rounded">${data.pricing[i].price + '/' + data.pricing[i].plan}</li>`;
        }else{
            listprices[i] = `<li class="bg-secondary m-1 p-2 rounded">${newData.pricing[i].price + '/' + newData.pricing[i].plan}</li>`;
        }
    }
    let priceall = listprices.join("");
    pricing.innerHTML = priceall;
    

    features = document.getElementById('features');
    const listFeatures = [];
    for(let i=0; i < Object.keys(data.features).length; i++){
        listFeatures[i] = `<li>${data.features[i+1].feature_name}</li>`;
    }
    let featuresAll = listFeatures.join("");
    features.innerHTML = featuresAll;

    integration = document.getElementById('integration');
    const integrations = [];
    if(data.integrations != null){
        for(let i=0; i < data.integrations?.length; i++){
            integrations[i] = `<li> ${data.integrations[i]}</li>`;
        }
        let integrationall = integrations.join("");
        integration.innerHTML = integrationall;
    }else{
        integration.innerHTML = 'No Data Found';
    }
    

    acc = document.getElementById('acc');
    if(data.accuracy.score != null){
        acc.classList.remove("d-none");
        acc.innerText = 100*data.accuracy.score + '% Accuracy';
    }else{
        acc.classList.add("d-none");
    }
}



