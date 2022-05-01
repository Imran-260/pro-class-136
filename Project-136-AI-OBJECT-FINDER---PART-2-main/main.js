status = "";
object = []

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
    video.size(480, 380);
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Object";
    object_name = document.getElementById("object_name_input").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function draw()
{
    image(video, 0, 0, 480, 380);

    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < object.length; i++)
        {
            fill("blue");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label == object_name)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTHL = object_name + "found";
                var synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(objecy_name + "found");
                synth.speak(utterThis);
            
            }

            else
            {
                document.getElementById("status"),innerHTML = object_name + "Not Found";
            }
        }
    }
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    object = results;
}