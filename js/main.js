// API call/fetch
const loaddata = async(limit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools/`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayTech(data,limit);
    }
    catch(e){
        console.log(e);
    }
}

// creating div elemnts and showing data from api
const displayTech = (data,limit = 6) =>{
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
                    <div class="card-body">
                        <h5 class="card-title">${tech.name}</h5>
                        <i class="bi bi-calendar-date"> ${tech.published_in}</i>
                    </div>
                </div>
            `
            techContainer.appendChild(techDiv);
            count++;
            return true;
        }
        else{
            return false;
        }
    });
    document.getElementById("spinner").classList.add("d-none");
    document.getElementById("more").classList.remove("d-none");
}

// initial load
loaddata();

// shomore button to show everything
document.getElementById("more").addEventListener("click", function(){
    document.getElementById("spinner").classList.remove("d-none");
    const techDiv = document.getElementById("tech-container");
    techDiv.innerHTML = '';
    loaddata(12);
    const more = document.getElementById("more");
    more.remove();
});




