
var jpdbBaseURL='http://api.login2explore.com:5577';
var jpdbIRL='/api/irl'
var jpdbIML='/api/iml '
var connToken="90931248|-31949329477525564|90960957";
var sDBName="DELIVERY-DB";
var sRelationName="SHIPMENT-TABLE";

$("#shipid").focus();

function saveRecNo2LS(jsonObj){
    var lvdData= JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvdData.rec_no);
}

function getShipIdAsJsonObj(){
    var shipid = $('#shipid').val();
    var JsonStr={
        ShipmentNo: shipid
    };
    return JSON.stringify(JsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var data=JSON.parse(jsonObj.data).record;
    $("#shipdesc").val(data.Description);
    $("#shipsrc").val(data.Source);
    $("#shipdest").val(data.Destination);
    $("#shipdate").val(data.Date);
    $("#shipedate").val(data.ExpectedDeliveryDate);

}


function resetForm() {
    $("#shipid").val("");
    $("#shipdesc").val("");
    $("#shipsrc").val("");
    $("#shipdest").val('');
    $("#shipdate").val('');
    $("#shipedate").val("");
    $("#shipid").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#update").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#shipid").focus();
  }


  

  function validateData() {
    
    var shipid = $("#shipid").val();
    var shipdesc = $("#shipdesc").val();
    var shipsrc = $("#shipsrc").val();
    var shipdest = $("#shipdest").val();
    var shipdate = $("#shipdate").val();
    var shipedate = $("#shipedate").val();

    if (shipid === ''){
        alert("Shipment ID is missing");
        $("#shipid").focus();
        return "";
    }

    if (shipdesc === ''){
        alert('Shipment Description is missing');
        $("#shipdesc").focus();
        return "";
    }

    if (shipsrc === ''){
        alert('Shipment Source is missing');
        $("#shipsrc").focus();
        return "";
    }

    if (shipdest === ''){
        alert(' Shipment Destination is missing');
        $("#shipdest").focus();
        return "";
    }

    if (shipdate === ''){
        alert('Shipment Date is missing');
        $("#shipdate").focus();
        return "";
    }

    if (shipedate === ''){
        alert('Expected-Delivery-Date of Shipment is missing');
        $("#shipedate").focus();
        return "";
    }

    var jsonStrObj = {
    ShipmentNo: shipid,
    Description: shipdesc,
    Source: shipsrc,
    Destination: shipdest,
    Date: shipdate,
    ExpectedDeliveryDate: shipedate
    };
    return JSON.stringify(jsonStrObj);
  

}




function updateData(){
    $('#update').prop("disabled", true)
    jsonChg= validateData();
    var updateRequest= createUPDATERecordRequest(connToken,jsonChg, sDBName, sRelationName, localstorage.getItem('recno'));
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    console.log(resJsonObj);
    resetForm();
    $("#shipid").focus();

    }


function getship(){
    var shipIdJsonObj= getShipIdAsJsonObj();
    var getRequest= createGET_BY_KEYRequest(connToken, sDBName, sRelationName, shipIdJsonObj);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj= executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({ async: true });
    if (resJsonObj.status===400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#shipdesc").focus();
    } 
    else if  (resJsonObj.status===200){
        $("#shipid").prop("disabled",true);
    
        fillData(resJsonObj);

        $("#update").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#shipdesc").focus();


    }



}    


function saveData() {
    console.log("this is working")
    var jsonStrObj = validateData();
    if (jsonStrObj === '') {
      return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, sDBName, sRelationName);
    jQuery.ajaxSetup({ async: false });
    var resJsonObj = executeCommandAtGivenBaseUrl( putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({ async: true });
    resetForm();
    $("#empid").focus();


  }