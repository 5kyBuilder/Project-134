Status = "";
object_detection = "";

objects = [];

function preload()
{
    sound1 = loadSound("alarm.mp3")
}

function setup()
{
    canvas = createCanvas(700,500);
    canvas.position(400,130);

    video = createCapture(VIDEO);
    video.hide();

    document.getElementById("status").innerHTML = "Status: Decting Objects";
    object_detection = ml5.objectDetector('cocossd', modelReady);

}

function modelReady()
{
    console.log("model ready");
    Status = true;
}

function gotResults(err, results)
{
    if(err){ return; }

    console.log(results);
    objects = results;
}

function start()
{
}

function draw()
{
    image(video, 0, 0, 700, 500);

    if(object_detection){
        object_detection.detect(video, gotResults);
    }
    
    if(objects.length === 0)
    {
        document.getElementById("check").innerHTML = "Baby Not Found";  
    }
    
    for(var i = 1; i<=objects.length; i++) // first object, i = 1. second object, i = 2. length = 2
    {
        document.getElementById("status").innerHTML = "Status: Objects Detected";
        fill(random() * 255,  random() * 255,  random() * 255);
        var percentage = floor(objects[i - 1].confidence * 100);
        text(objects[i - 1].label + " " + percentage + "%", objects[i - 1].x + 15, objects[i - 1].y + 15);
        noFill();
        stroke(random() * 255,  random() * 255,  random() * 255);
        rect(objects[i - 1].x, objects[i - 1].y, objects[i - 1].width, objects[i - 1].height);

        if(objects[i - 1].label == "person")
        {
            document.getElementById("check").innerHTML = "Baby Found";
        }else{
            document.getElementById("check").innerHTML = "Baby Not Found";
        }
    }
}