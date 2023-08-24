// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var containerEL = $('.containerEL')
  var savingEL = $('.saveBtn')
  var describ = $('.description')

  savingEL.on('click', HandleSaveform);
  displaytime()
  telltime()
  DisplayDescr()

  function displaytime(){
    var currentDay = $('#currentDay')
    var rightNow = dayjs().format('dddd, MMM DD');
    currentDay.text(rightNow);
  }
  function telltime()
  {
    var currentHour = dayjs().hour()
    for( var i = 0; i < containerEL.children().length; i++)
    {
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
  }
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
  function savescheduledevents(scheduledevents){
    localStorage.setItem('scheduledevents', JSON.stringify(scheduledevents));
  }
  function DisplayDescr(scheduledevents)
  {
    var scheduledevents = JSON.parse(localStorage.getItem("scheduledevents"))
    for( var i = 0; i < containerEL.children().length; i++)
    {
      var divhour = containerEL.children().eq(i).attr('id');
      for( var j = 0; j < scheduledevents.length; j++)
      {
        if(scheduledevents[j].id == divhour)
        {
          console.log(scheduledevents[j].description)
          describ.text(scheduledevents[j].description)
        }

      }
    }
  }

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
});
