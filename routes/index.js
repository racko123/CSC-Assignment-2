var clarifaiApiKey = 'ee72fbeb9aa946cf9ddcbc3f8ef0a2c2';
var workflowId = 'Face';

var app = new Clarifai.App({
    apiKey: clarifaiApiKey
  });
  
  function uploadImage() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    document.getElementById("Loading").style.display = "block";

    reader.addEventListener("load", function () {
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
        function (response) {
            var outputs = response.results[0].outputs;
            var analysis = $(".analysis");
            //var Total=0;
            var Result = document.getElementById("Result")
            Result.innerHTML = "";
            var Amount = document.getElementById("Amount")
            Amount.innerHTML = "";
            analysis.empty();
            console.log(outputs);

            if (outputs[2].data.regions.length>0) {
                Result.innerHTML="This is a Receipt";
                document.getElementById("Loading").style.display = "none";
            }
            else {
                Result.innerHTML = "This is not a Receipt";
                document.getElementById("Loading").style.display = "none";
            }

            for (i = 0; i < outputs[2].data.regions.length; i++) {
                if (outputs[2].data.regions[i].data.text.raw == "100") {
                    Amount.innerHTML = ", The Amount is " + outputs[2].data.regions[i].data.text.raw;
                }
            }

            outputs.forEach(function (output) {
                var modelName = getModelName(output);
                // Create heading for each section
                var newModelSection = document.createElement("div");
                newModelSection.className = modelName + " modal-container";

                var newModelHeader = document.createElement("h2");
                newModelHeader.innerHTML = modelName;
                newModelHeader.className = "model-header";

                var formattedString = getFormattedString(output);
                var newModelText = document.createElement("p");
                newModelText.innerHTML = formattedString;
                newModelText.className = "model-text";

                newModelSection.append(newModelHeader);
                newModelSection.append(newModelText);
                analysis.append(newModelSection);
            });
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
