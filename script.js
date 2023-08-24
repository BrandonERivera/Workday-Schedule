// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //declaring variables for elements
  var containerEL = $('.containerEL')
  var savingEL = $('.saveBtn')
  var describ = $('.description')
//functions that begin immediately
  savingEL.on('click', HandleSaveform);
  displaytime()
  telltime()
  DisplayDescr()
  //this displays the day month and the day in numeric and this is in the element for currentDay
  function displaytime(){
    var currentDay = $('#currentDay')
    var rightNow = dayjs().format('dddd, MMM DD');
    currentDay.text(rightNow);
  }
  //telltime is what sets the different containers to past present or future
  function telltime()
  {
    //gets the current hour
    var currentHour = dayjs().hour()
    // a for loop goes through the container, and for each child it adds either past present of future
    for( var i = 0; i < containerEL.children().length; i++)
    {
      var divhour = containerEL.children().eq(i).attr('id');
      //past and present added is the divhour(which is the timeblocks id) is greater then or equal to then current hour and if not it is a future
      if(divhour < "hour-"+ currentHour){
        containerEL.children().eq(i).addClass('past')
      }
      else if (divhour == "hour-"+ currentHour){
        containerEL.children().eq(i).addClass('present')
      }
      else{
      containerEL.children().eq(i).addClass('future')
     } 
    }
  }
  //saves the form in localstorage
  function HandleSaveform(){
    //creates the localstorage array, then gets the id and the text value and puts it in scheduling object
    var scheduledevents = JSON.parse(localStorage.getItem("scheduledevents")) || []
    Thiselid = $(this).parent().attr('id')
    descriptionel = $(this).parent().children().eq(1).val()

    var scheduling = {
      id: Thiselid,
      description: descriptionel
    };
    //this checks the scheduling length is not empty if its not, it moves to a for loop
    if(scheduledevents.length != 0)
    {
      //for loop checks to see if theres an object in the localstorage that already has an id that is in the scheduling
      for( var i = 0; i < scheduledevents.length; i++)
     {
      //if it is then it replaces the description
        if(scheduledevents[i].id == scheduling.id)
        {
         scheduledevents[i].description = scheduling.description;
         savescheduledevents(scheduledevents);   
         return;
        }
        //if not then it adds to the schedulingevents array
        else if( i == scheduledevents.length-1 && scheduledevents[i].id != scheduling.id)
        {
          scheduledevents.push(scheduling);
          savescheduledevents(scheduledevents);
        }
      }
    }
    //if the array is empty just push the object to the array
    else
    {
      scheduledevents.push(scheduling);
      savescheduledevents(scheduledevents);
    }

  }
  //saces to the local storage
  function savescheduledevents(scheduledevents){
    localStorage.setItem('scheduledevents', JSON.stringify(scheduledevents));
  }
  //this is SUPPOSE to show them in the different descriptions
  function DisplayDescr(scheduledevents)
  {
    //gets the stored object into an array
    var scheduledevents = JSON.parse(localStorage.getItem("scheduledevents"))
    //got each of the container element it gets the id
    for( var i = 0; i < containerEL.children().length; i++)
    {
      var divhour = containerEL.children().eq(i).attr('id');
      //in this it goes though the id of each of the scheduledevents array
      for( var j = 0; j < scheduledevents.length; j++)
      {
        //compares the schedulingevents.id and the id of the time-block
        if(scheduledevents[j].id == divhour)
        {
          //its suppose to replace the text with the descriptions however describ[j].text does not work still trying to figure that out
          //describ[i].text(scheduledevents[j].description)
        }
      }
    }
  }
});
