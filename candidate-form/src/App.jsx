import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

const baseurl = "https://candidate-form-1.onrender.com"
function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gmail, setGmail] = useState("");
  const [age, setAge] = useState("");
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [sameAsResidential, setSameAsResidential] = useState(false)
  const [title, setTitle] =useState("")
  const [file, setFile] = useState("")
  const [allImage, setAllImage] = useState(null)
  const [documentSections, setDocumentSections] = useState([{ id: 1 }])
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    getPdf()
  }, [])
  const getPdf = async () => {
    const result = await axios.get("http://localhost:8000/get-files")
    console.log(result.data.data)
    setAllImage(result.data.data)
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);

  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handleGmailChange = (event) => {
    setGmail(event.target.value)
  }

  const handleAgeChange = (event) => {
    setAge(event.target.value)
  }

  const handleAddress1Change = (event) => {
    setAddress1(event.target.value);
  }

  const handleAddress2Change = (event) => {
    setAddress2(event.target.value);
  }

  const handleSameAsResidentialChange = () => {
    setSameAsResidential(!sameAsResidential);
    if (!sameAsResidential) {
      setAddress1(address1);
      setAddress2(address2);
    } else {
      setAddress1('');
      setAddress2('');
    }
  }

  const [fileType, setFileType] = useState("");
  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
}

const handleAddDocumentSection = () => {
  setDocumentSections([...documentSections, { id: documentSections.length + 1 }]);
}

const handleDeleteDocumentSection = (id) => {
  if (documentSections.length > 1) {
    setDocumentSections(documentSections.filter(section => section.id !== id));
  }
};

  const submitImage = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("file", file)
    formData.append("fileType", fileType); 
    console.log(title, file)
    try {
      const result = await axios.post(
          `${baseurl}/upload-files`,
          formData,
          {
              headers: { "Content-Type": "multipart/form-data" },
          }
      );
      console.log(result)
      setShowThankYou(true)
  } catch (error) {
      console.error("Error uploading image:", error)
  }
  }

  return (
    <>
      <div className="container">
        {!showThankYou ? (
      <form onSubmit={submitImage}>
        <div className="wrapper" style={{ fontFamily: "'Rancho', sans-serif", 
        fontSize: "40px", fontWeight: "700" , color:"#acd3d3", letterSpacing:"2.5px"}}>Candidate Form</div>
        <div className="forms">

          <div className="form-group">
            <h4 className='names'>First Name*</h4>
            <input type="text" className="candi-name" placeholder='Enter your first name here' value={firstName} onChange={handleFirstNameChange} required />
          </div>

          <div className="form-group">
            <h4 className='names'>Last Name*</h4>
            <input type="text" className="candi-name" placeholder='Enter your last name here' value={lastName} onChange={handleLastNameChange} required />
          </div>
        </div>
        <div className="forms" style={{ marginTop: "10px" }}>
          <div className="form-group">
            <h4 className='names'>E-mail*</h4>
            <input type="email" className="candi-name" placeholder='ex:myname@example.com' value={gmail} onChange={handleGmailChange} required />
          </div>
          <div className="form-group">
            <h4 className='names'>Date of Birth*</h4>
            <input type="number" className="candi-name" placeholder='Date of Birth' min="18" value={age} onChange={handleAgeChange} required />
            <h6 className="min-age" style={{ marginTop: "10px", fontFamily: "sans-serif", color: "#ed6442" }}>(Min age should be 18 years)</h6>
          </div>
        </div>
        <div className="forms" style={{ marginTop: "-2em" }}>
          <div className="form-group">
            <h4 className='names'>Residential Address</h4>
            <h5 className="address" style={{ marginTop: "-10px", fontFamily: "sans-serif",
            fontWeight: "500", fontSize: "14px", color:"#bec2c2" }}>Street 1*</h5>
            <input type="text" className="candi-name" value={address1} onChange={handleAddress1Change} required />
          </div>
          <div className="form-group">
            <h5 className='address' style={{ marginTop: "5em", fontFamily: "sans-serif", fontWeight: "500",  fontSize: "14px", color:"#bec2c2"  }}>Street 2*</h5>
            <input type="text" className="candi-name" value={address2} onChange={handleAddress2Change} required />
          </div>
        </div>
        <div className="address-container">
          <div className="address-wrapper" style={{marginRight:"34em", marginTop:"10px", fontFamily:"sans-serif", fontSize: "14px", color:"#bec2c2" }}>
            <input type="checkbox" id="sameAsResidential" checked={sameAsResidential} onChange={handleSameAsResidentialChange} />
            <label htmlFor="sameAsResidential">Same as Residential Address</label>
          </div>
        </div>
        <div className="forms" style={{ marginTop: "0.5em" }}>
          <div className="form-group" >
            <h4 className='names'>Permanent Address</h4>
            <h5 className="address" style={{ marginTop: "-10px", fontFamily: "sans-serif", fontWeight: "500",  fontSize: "14px", color:"#bec2c2"  }}>Street 1</h5>
            <input type="text" className="candi-name" value={sameAsResidential ? address1 : ''} onChange={handleAddress1Change} required={!sameAsResidential} />
          </div>
          <div className="form-group">
            <h5 className='address' style={{ marginTop: "5em", fontFamily: "sans-serif", fontWeight: "500",  fontSize: "14px", color:"#bec2c2"  }}>Street 2</h5>
            <input type="text" className="candi-name" value={sameAsResidential ? address2 : ''} onChange={handleAddress2Change} required={!sameAsResidential} />
          </div>
        </div>
        {documentSections.map((section) => (
          <div key={section.id} className="document" style={{ marginTop: "15px" }}>
            <div className="document-group" onSubmit={submitImage}>
              <h4 className='doc'>Upload Documents</h4>
              <h5 className="files">File Names*</h5>
              <input type="text"  style={{borderRadius:"1em", backgroundColor:"#bec2c2", padding:"12px"}} className="doc-name" onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="document-group">
              <h5 className="files" style={{ marginTop: "4.5em"}}>Type of File*</h5>
              <select className="form-control" style={{padding:"12px",borderRadius:"1em",backgroundColor:"#bec2c2", marginTop:"-9px"}} onChange={handleFileTypeChange} required>
                <option value="">Select</option>
                <option value="pdf">PDF</option>
                <option value="image">Image</option>
              </select>
            </div>
            <div className="document-group">
              <h5 className="files" style={{ marginTop: "4.5em"}}>Upload Document*</h5>
              <input type="file" style={{borderRadius:"1em", padding:"11px"}} className="form-control" 
              accept='application/pdf/image' onChange={(e) => setFile(e.target.files[0])} required/>
              <i className="bi bi-file-plus-fill" style={{ fontSize: "1.5rem"}} onClick={handleAddDocumentSection} ></i>
              {documentSections.length > 1 && <i className="bi bi-trash-fill" onClick={() =>handleDeleteDocumentSection(section.id)} ></i>}
            </div>
          </div>
        ))}
  
        <button className='btn btn-primary' type='submit' style={{background:"#5c7575", marginTop:"3em", padding:"7px", width:"130px", borderRadius: "0.5em",
        fontSize:"18px", fontWeight:"700", color:"white"}}>Submit</button>
      </form>
        ):(
          <div style={{ textAlign: "center", color:"white" , }}>
          <h2 >Thank you for submitting!</h2>
        </div>
        )}
    </div>
    </>
  )
}

export default App;


