
    var entries;
    var uniqueEntries = [];
    var listHTML='<table><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead>';

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

        //Loop Details:
        function iterate(entry){

                 var sessionTime = new Date(entry.ts*1);

                 listHTML += `<TR>
                     <TD>${entry.username}</TD>
                     <TD>${getIcon(entry.event_1_start)}</TD>
                     <TD>${getIcon(entry.event_2_start)}</TD>
                     <TD>${getIcon(entry.event_3_start)}</TD>
                     <TD>${getIcon(entry.event_4_start)}</TD>
                 </TR>`;

            //Build List
           let  list = document.querySelector("#sessionList");
           list.innerHTML=listHTML;

        }
