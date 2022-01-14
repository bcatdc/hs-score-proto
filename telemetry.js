
//Should refactor this JS with targets.js so as not to have duplicates

    var entries;
    var uniqueEntries = [];
    var listHTML='<table><thead><tr><th></th><th>E</th><th>F</th><th>G</th></tr></thead>';

    //Set up unique filter
    const unique= (value, index, self) => {
        return self.indexOf(value) === index
    }

        window.addEventListener('load', function() {
            document.getElementById('date').innerHTML = theDate.toDateString();
        })

        // Location of Data
        let apiUrl ="https://sheetdb.io/api/v1/9l1d8y32r714t/search/?";


                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);

                const room = urlParams.get('room')
                const epoch= urlParams.get('epoch')

                var theDate = new Date(epoch*1000);
                var dd = theDate.toLocaleDateString("en-GB", { // you can use undefined as first argument
                    day: "2-digit",
                });
                var mm = theDate.toLocaleDateString("en-GB", { // you can use undefined as first argument
                    month: "2-digit",
                });
                var yyyy = String(theDate.getFullYear());


                var cohort_id = yyyy+mm+dd+" "+ room;
                console.log(cohort_id);


                // Get all data sorted by time submitted in ascending order
                axios.get(apiUrl + 'cohort_id='+ cohort_id +'&sort_by=event_1_start&sort_order=desc')
                .then( response => {

            //Throw it in the console
            console.log(response.data);

            //Loop Through It
            response.data.forEach(entry => iterate(entry));

            console.log(uniqueEntries);
        });

        function getIcon(event_result){
            if (event_result == 'null'){
                return `
                <span class="fa-stack fa-2x" style="color:#fff;">
                <i class="far fa-square fa-stack-2x"></i>
                <i class="fas fa-check fa-stack-1x"></i>
                </span>`;
            }else{
                return `
                <span class="fa-stack fa-2x">
                <i class="far fa-square fa-stack-2x" style="color:#666;"></i>
                <i class="fas fa-times fa-stack-1x"></i>
                </span>`
            }
        }

        var possibleLookEvents = 52;
        var durInSec = 416;

        //Loop Details:
        function iterate(entry){

                 var sessionTime = new Date(entry.ts*1);


                 var color2 = [255, 166, 0];
                 var color1 = [0, 153, 255];


              var a = Math.round ((entry.look_event_uniques / possibleLookEvents*100));
                 var aColor= pickHex(color1,color2, (a/100));
                 var aPie =`
                 <div class="pie" style="--p:${a};--b:1vw;--c:rgb(${aColor});">${a}</div>
                 `

                 var b = Math.round ((entry.total_duration/ durInSec*100));
                                  var bColor= pickHex(color1,color2, (b/100));
                 var bPie =`
                 <div class="pie" style="--p:${b};--b:1vw;--c:rgb(${bColor});">${b}</div>
                 `
                 var c = entry.look_count;

                 listHTML += `<TR>
                     <TD>${entry.username}</TD>
                     <TD>${aPie}</TD>
                     <TD>${bPie}</TD>
                     <TD>${c}</TD>
                 </TR>`;

            //Build List
           let  list = document.querySelector("#sessionList");
           list.innerHTML=listHTML;

           function pickHex(color1, color2, weight) {
    var p = weight;
    var w = p * 2 - 1;
    var w1 = (w/1+1) / 2;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return rgb;
}

        }
