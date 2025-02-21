import React from 'react';
import { Image, Text, View, Page, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Style } from '@react-pdf/types';

const Invoice = () => {

    const receipt_data = {

    }
    const styles = StyleSheet.create({
        page: {fontSize: 11,paddingTop: 20,paddingLeft: 40,paddingRight: 40,lineHeight: 1.5,flexDirection: 'column' },

    });

    const InvoiceTitle = () => (<></>);
    const Address = () => (<></>);
    const UserAddress = () => (<></>);
    const TableHead = () => (<></>);
    const TableBody = () => (<></>);
    const TableTotal = () => (<></>);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle  />
                <Address/>
                <UserAddress/>
                <TableHead/>
                <TableBody/>
                <TableTotal/>
            </Page>
        </Document>
    )

}
export default Invoice;
