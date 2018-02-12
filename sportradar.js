function requestMedals() { 
  // var response = UrlFetchApp.fetch("https://api.sportradar.us/olympics/trial/v3/en/medals.xml?api_key=YourKeyHere");
  // this is pulling from my github gist right now as an example... add your api key above to pull from source
  var response = UrlFetchApp.fetch("https://gist.githubusercontent.com/CerebralMastication/ec94ca8d747d88cc2337624ebbb7f844/raw/2dc6e919050bacce4b02bc9a9e64077f559757b2/example.json");
  var xml = response.getContentText();
  var xmlData = XmlService.parse(xml);
  var xml_root = xmlData.getRootElement();
  var res = [];
  var c1 = xml_root.getChildren();
  var val_list = [];
  
  // we just want the country summary, so that's element 0
  i = 0
    
  var medals_by_country = c1[i].getChildren();
  var start_row = 3
  
  var header_rng = SpreadsheetApp.getActive().getActiveSheet().getRange(start_row, 2, 1, 9 );
  
  start_row = start_row + 1
  var rng = SpreadsheetApp.getActive().getActiveSheet().getRange(start_row, 2, 1, 9 );
  
  var result_array = [];
  
  var i = 0;
  
  for (var j in medals_by_country) { 
    var country_values = medals_by_country[j].getAttributes();
    var header = [];
    var values = [];
    for (var k in country_values) {
      
      header.push(country_values[k].getName());
      values.push(country_values[k].getValue());

    }
    
    result_array.push(values);
  }
  result_array.push(header);
  result_array.reverse();
//Logger.log(array);
return result_array;
}

