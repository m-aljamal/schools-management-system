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
    marginTop: "550px",
    marginLeft: "250px",
    transform:"rotate(-90deg)",
    // transform:"translate(120%, px) rotate(-90deg)",
  },
  imgCon: {
    position: "relative",
     
  },
});

const PDF = ({ name }: any) => (
  <Document title="student grade">
    {/* <Page size="A4">
      <View>
        <View style={titleStyles.title}>
          <Text>{name}</Text>
        </View>
        <View style={titleStyles.no}>
          <Text>No:</Text>
          <Text style={{ marginTop: "5px" }}>Tarih:</Text>
        </View>
      </View>
    </Page> */}
    <Page size="A4" style={titleStyles.imgCon}>
      <Text style={titleStyles.tesst}>{name}</Text>
      <Image src="/s1.jpg" style={titleStyles.img} />
    </Page>
  </Document>
);

const Pdf = ({ name }: any) => {
  return (
    // <PDFDownloadLink
    //   document={<PDF name={name} />}
    //   fileName={"Quote" + new Date().getTime() + ".pdf"}
    // >
    //   {({ blob, url, loading, error }: any) =>
    //     loading ? "Loading . . ." : "Download"
    //   }
    // </PDFDownloadLink>
    <PDFViewer style={titleStyles.container}>
      <PDF name={name} />
    </PDFViewer>
  );
};

export default Pdf;
