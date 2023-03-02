const loaddata = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools/`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayTech(data);
    }
    catch(e){
        console.log(e);
    }
}

loaddata();

const displayTech = (data,limit = 6) =>{
    const techContainer = document.getElementById('tech-container');
    let count = 0;
    data.data.tools.every(tech => {
        if(count < limit){
            // console.log(tech);
            const techDiv = document.createElement('div');
            techDiv.classList.add('col');
            techDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${tech.image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
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
}