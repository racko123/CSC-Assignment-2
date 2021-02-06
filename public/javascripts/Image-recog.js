var clarifaiApiKey = '15e8ff9d6cb74e608da8f5f00caf35a3';
var workflowId = 'Face';

var app = new Clarifai.App({
    apiKey: clarifaiApiKey
});

// Handles image upload
function uploadImage() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function() {
        preview.src = reader.result;
        var imageData = reader.result;
        imageData = imageData.replace(/^data:image\/(.*);base64,/, '');
        predictFromWorkflow(imageData);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
        preview.style.display = "inherit";
    }
}

// Analyzes image provided with Clarifai's Workflow API
function predictFromWorkflow(photoUrl) {
    app.workflow.predict(workflowId, { base64: photoUrl }).then(
        function(response) {
            var outputs = response.results[0].outputs;
            var analysis = $(".analysis");
            var Result = document.getElementById("Result")
            Result.innerHTML = "This is not a Human Face";
            analysis.empty();
            console.log(outputs);

            if (outputs[0].data.regions[0].value > 0.9) {
                Result.innerHTML = "This is a Human Face";
                console.log("ree")
            }
        },
    );
}

// Helper function to get model name
function getModelName(output) {
    if (output.model.display_name !== undefined) {
        return output.model.display_name;
    } else if (output.model.name !== undefined) {
        return output.model.name;
    } else {
        return "";
    }
}