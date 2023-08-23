// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var currentDay = $('#currentDay')
  var currentHour = dayjs().hour()
  var containerEL = $('.containerEL')
  var eventsEL = $('.time-block')
  var savingEL = $('.saveBtn')
  var rightNow = dayjs().format('dddd, MMM DD');
  for( var i = 0; i < containerEL.children().length; i++){
    var divhour = containerEL.children().eq(i).attr('id');
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

  savingEL.on('click', HandleSaveform)

  function HandleSaveform(){
    var scheduledevents = JSON.parse(localStorage.getItem("scheduledevents")) || []
    Thiselid = $(this).parent().attr('id')
    descriptionel = $(this).parent().children().eq(1).val()

    var scheduling = {
      id: Thiselid,
      description: descriptionel
    };
    if(scheduledevents.length != 0)
    {
      for( var i = 0; i < scheduledevents.length; i++)
     {
        if(scheduledevents[i].id == scheduling.id)
        {
         scheduledevents[i].description = scheduling.description;
         savescheduledevents(scheduledevents);   
         console.log(scheduledevents[i].id);
         return;
        }
        else if( i == scheduledevents.length-1 && scheduledevents[i].id != scheduling.id)
        {
          scheduledevents.push(scheduling);
          savescheduledevents(scheduledevents);

        }
      }
    }
    else
    {
      scheduledevents.push(scheduling);
      savescheduledevents(scheduledevents);
    }

  }
  function savescheduledevents(scheduledevents) {
    localStorage.setItem('scheduledevents', JSON.stringify(scheduledevents));
  }
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
});
