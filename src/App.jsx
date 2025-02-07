import {useState} from "react"

// const App = () => {

  function App(){

   const [img, setImg] = useState();
   const[loading ,setLoading]=useState(false);

   const [qrData,setQrData]=useState("joes");

   const [qrSize,setQrsize]=useState("300");
    
    async function generateQr(){
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;

      setImg(url);
    }
    catch(error){
      console.error("Error Generating Qr Code"+error)
    }
    finally{
      setLoading(false)
    }
   }

   function downloadQr(){
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qr.png";
      document.body.append(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error)=>{
      console.error("Error Download Qr Code"+error)

    });
  }


  return (
    <div className="app-container">
        <h1>Qr Code Generator</h1>
        {/* conditinal Rendering */}
      {loading && <p>Please Wait...</p>}

        {/* conditinal Rendering */}
    { img && <img src={img} className="qr-code-image" />}
    
        <div>
        <label htmlFor="dataInput" className="input-label">
            Data For Qr Code:
        </label>
        <input type="text" value={qrData} id="sizeInput" onChange={(e)=>setQrData(e.target.value)} placeholder="Enter Data For Qr Code"/>
        <label htmlFor="sizeInput" className="input-label" >
            Image Size(e.g., 150):
        </label>
        <input type="text" id="dataInput" value={qrSize} onChange={(e)=>setQrsize(e.target.value)} placeholder="Enter Image Size" />
        <button  className="generate-button" disabled={loading} onClick={generateQr}>Generate Qr Code </button>
        <button className="download-button" onClick={downloadQr} >Download Qr Code</button>
    </div>
    {/* <p className="footer" >Designed By <a href="#">Tutor Joes</a></p> */}
    </div>

  )
}


export default App



