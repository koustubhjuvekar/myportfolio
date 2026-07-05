console.log("TinyMCE =", typeof tinymce);

tinymce.init({
    selector: "#editor",

    license_key: "gpl",

    height: 650,
    menubar: true,

    plugins: [
        "lists",
        "link",
        "image",
        "table",
        "code",
        "preview",
        "codesample",
        "media",
        "fullscreen",
        "autosave"
    ],

    toolbar:
        "undo redo | blocks | bold italic underline | forecolor backcolor | " +
        "alignleft aligncenter alignright alignjustify | " +
        "bullist numlist | image media table link | " +
        "codesample code preview fullscreen"
});

function previewPost() {

    const html = tinymce.get("editor").getContent();

    const win = window.open();

    win.document.write(html);

}

async function publishPost() {

    const title = document.getElementById("title").value.trim();

    const category = document.getElementById("category").value;

    const content = tinymce.get("editor").getContent();

    if (title === "") {

        alert("Enter Title");

        return;

    }

    try {

        const response = await fetch(
            "https://portfolio-api.koustubhjuvekarofficial.workers.dev/publish",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    title: title,

                    folder: category,

                    content: content

                })

            }
        );

        const result = await response.json();

        console.log(result);

        if (result.success) {

            alert("✅ Article Published Successfully!");

        } else {

            alert("❌ Publish Failed");

            console.log(result);

        }

    } catch (err) {

        console.error(err);

        alert("Connection Error");

    }

}
