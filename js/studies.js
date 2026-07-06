
// ================================
// Load JSON Files
// ================================

let allPosts = [];

Promise.all([
    fetch("data/studies.json").then(r => r.json()),
    fetch("data/blogs.json").then(r => r.json()),
    fetch("data/articles.json").then(r => r.json())
])

.then(([studies, blogs, articles]) => {

    document.getElementById("studyCount").innerText = studies.length;
    document.getElementById("blogCount").innerText = blogs.length;
    document.getElementById("articleCount").innerText = articles.length;
    document.getElementById("totalCount").innerText =
        studies.length + blogs.length + articles.length;

    allPosts = [
        ...studies,
        ...blogs,
        ...articles
    ];

    allPosts.sort((a,b)=>new Date(b.date)-new Date(a.date));

    showPosts(allPosts);

});


// ================================
// Latest Posts
// ================================

function showPosts(posts){

    const container = document.getElementById("latestPosts");

    container.innerHTML="";

    posts.forEach(post=>{

        container.innerHTML+=`

        <div class="col-lg-4 mb-4">

            <div class="card h-100 shadow">

                <div class="card-body">

                    <h4>${post.title}</h4>

                    <small>${post.date}</small>

                    <br><br>

                    <a href="${post.file}"
                       class="btn btn-primary">

                       Read More

                    </a>

                </div>

            </div>

        </div>

        `;

    });

}


// ================================
// Search
// ================================

document.getElementById("search").addEventListener("keyup",function(){

    const keyword=this.value.toLowerCase();

    const filtered=allPosts.filter(post=>

        post.title.toLowerCase().includes(keyword)

    );

    showPosts(filtered);

});
