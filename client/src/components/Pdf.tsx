import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";

const titleStyles = StyleSheet.create({
  title: {
    fontSize: "13px",
    margin: "10px auto",
  },
  no: {
    fontSize: "10px",
    marginLeft: "15px",
  },
  test: {
    fontFamily: "Arabic",
  },
  img: {
    width: "100%",
    height: "100%",
    zIndex: -5,
    position: "absolute",
  },
  container: {
    width: "100%",
    height: "800px",
  },
  tesst: {
    fontSize: "16px",
    //  move from top 100px
    // marginTop: "100px",
    // marginTop: "50px",
    // marginLeft: "20px",
    bottom: "170px",
    position: "absolute",
    left: "120px",
    // transform:"translate(120%, px) rotate(-90deg)",
  },
  tess: {
    fontSize: "16px",
    //  move from top 100px
    // marginTop: "100px",
    // marginTop: "50px",
    // marginLeft: "20px",
    top: "170px",
    position: "absolute",
    left: "120px",
    // transform:"translate(120%, px) rotate(-90deg)",
  },
  // tesst: {
  //   fontSize: "16px",
  //   //  move from top 100px
  //   // marginTop: "100px",
  //   marginTop: "550px",
  //   marginLeft: "250px",
  //   transform:"rotate(-90deg)",
  //   // transform:"translate(120%, px) rotate(-90deg)",
  // },
  imgCon: {
    position: "relative",
  },
  landImg: {
    width: "100%",
    height: "100%",
    zIndex: -5,
    position: "absolute",
  },
});

const PDF = ({ name }: any) => (
  <Document title="student grade">
    <Page size="A4" style={titleStyles.imgCon} orientation="landscape">
      <Text style={titleStyles.tesst}>{name}</Text>
      <Text style={titleStyles.tess}>{name}</Text>
      <Image src="/s1.jpg" style={titleStyles.landImg} />
    </Page>
    <Page size="A4" style={titleStyles.imgCon} orientation="landscape">
      <Text style={titleStyles.tesst}>20</Text>
      <Text style={titleStyles.tess}>30</Text>
      <Image src="/ss1.jpg" style={titleStyles.landImg} />
    </Page>
  </Document>
);

const Pdf = ({ name }: any) => {
  return (
    <PDFDownloadLink
      document={<PDF name={name} />}
      fileName={"Quote" + new Date().getTime() + ".pdf"}
    >
      {({ blob, url, loading, error }: any) =>
        loading ? "Loading . . ." : "Download"
      }
    </PDFDownloadLink>
  );
};

export default Pdf;
