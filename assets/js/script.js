
// var words = [
//   {text: 'Lorem', weight: 13, link: 'http://github.com/mistic100/jQCloud'},
//   {text: 'Ipsum', weight: 10.5, link: 'http://www.strangeplanet.fr'},
//   {text: "Dolor", weight: 9.4, link: 'http://piwigo.org'},
//   /* ... */
// ];

var anArrayList = createRandomProductsArray(10);
//var newUniqueArray = removeDuplicates(anArrayList);
var anObjectList = createJQcloudFormattedData(anArrayList);
// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    //console.log("randomAnimals:",randomProduct);
    console.log("anArrayList:",anArrayList);
    console.log("anObjectList:",anObjectList);
    $('#keywords').jQCloud(anObjectList);
});

// FUNCTIONS
function createRandomProductsArray(quantity) {
  //Define array
  var arrayOfProducts = [];
  //Create a random list of products
  let i;
  for (i = 0; i < quantity; ++i) {
    let aRandomProduct = faker.commerce.product();
    //let aRandomProduct = faker.random.arrayElement(faker.definitions.commerce.product_name.product);
    arrayOfProducts.push(aRandomProduct);


  }
  //Have the function return the new array list.
  console.log("arrayOfProducts:",arrayOfProducts);
  let newArray = removeDuplicates(arrayOfProducts);
  return newArray;

}

function createJQcloudFormattedData(anArrayList) {
  //Define array
  var words = [];
  //Create a random list of products
  anArrayList.forEach(function(item,index){
      var anObj = {
        text: item,
        weight: faker.random.number({min:1, max:10}),
        handlers: { click: function() {
          let url = "https://api.giphy.com/v1/gifs/search?q=" + item + "&api_key=xpk7qtWFTosq9WPfU94mFoqXyCSGmSj9&limit=10";
          var xhr = $.get(url);
          xhr.done(function(results) {
            console.log("success got results", results);
            appendImagesToSection(results);
          }); //end xhr.done
        }}, //end handers funciton
      }; //end anObj
      words.push(anObj);
  }); //end anArrayList

  //Have the function return the new array list.
  return words;

}

function removeDuplicates(arr){
  let unique_array = [];
  for(let i = 0;i < arr.length; i++){
    if(unique_array.indexOf(arr[i]) == -1){
      unique_array.push(arr[i]);
    }
  }
  return unique_array;
}

function appendImagesToSection (results) {
  $('#artWork').empty();
  var thedata = results.data;
  console.log("thedata:",thedata);
  thedata.forEach(function(imgItem,imgIndex){
    console.log("imgItem:",imgItem);
    console.log("imgIndex:",imgIndex);
    var stillImage = imgItem.images.fixed_height_small_still.url;
    var motionImage = imgItem.images.downsized.url;
    var itemTitle = imgItem.title;
     $('<img />')
     .attr('src', "" + stillImage + "")         // ADD IMAGE PROPERTIES.
     .attr('title', itemTitle)
     .attr('alt', itemTitle)
    // .attr("onclick", toggleImage())
     .width('113px').height('113px')
     .appendTo($('#artWork'));
  });

}
function toggleImage(image) {


  // $('<img />')
  // .attr('src', "" + image + "")

}
