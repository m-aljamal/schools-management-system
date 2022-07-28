import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
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
});

const PDF = ({ name }: any) => (
  <Document title="student grade">
    <Page size="A4">
      <View>
        <View style={titleStyles.title}>
          <Text>{name}</Text>
        </View>
        <View style={titleStyles.no}>
          <Text>No:</Text>
          <Text style={{ marginTop: "5px" }}>Tarih:</Text>
        </View>
      </View>
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
