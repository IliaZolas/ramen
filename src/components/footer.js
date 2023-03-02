import "./footer.css"

const Footer = () => {
    return (
         <div className="footer">
            <div className="footer-column">
               <h3><a href="https://www.instagram.com/ramencrazy/">Instagram</a></h3>
               <hr   style={{
                     background: '#ED3D1E',
                     border: "1px solid",
                     height:"1px",
                     width: "90vw",
                     marginTop: "30px",
                     marginLeft: "20px"
                  }}
                  />
            </div>
         </div>
      );
}

export default Footer;