import React from "react";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { UpdateCompanyModalProps } from "../types/UpdateCompanyModalProps";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

function UpdateCompanyModal(props: UpdateCompanyModalProps) {
    const { showModal, companyToEdit, onClose } = props;
    return(
        <Modal
            open={showModal}
            onClose={onClose}
        >
            <Box sx={{...modalStyle, width: 600}}>
                <Typography variant={"h4"}>{companyToEdit?.name}</Typography>
                <br/>
                <Box>
                    <Typography variant={"h6"}>Stock Data</Typography>
                    <TextField label="Stock Price" variant="outlined" defaultValue={companyToEdit?.stockPrice || ""}/>
                    <br/>
                    <Typography variant={"h6"}>Balance Sheet</Typography>
                    <TextField label="Current Assets" variant="outlined" defaultValue={companyToEdit?.currentAssets || ""}/>
                    <TextField label="Total Assets" variant="outlined" defaultValue={companyToEdit?.totalAssets || ""}/>
                    <TextField label="Current Liabilities" variant="outlined" defaultValue={companyToEdit?.currentLiabilities || ""}/>
                    <TextField label="Total Liabilities" variant="outlined" defaultValue={companyToEdit?.totalLiabilities || ""}/>
                    <TextField label="Total Shareholders' Equity" variant="outlined" defaultValue={companyToEdit?.totalShareholdersEquity || ""}/>
                    <TextField label="Total Equity" variant="outlined" defaultValue={companyToEdit?.totalEquity || ""}/>
                    <br/>
                    <Typography variant={"h6"}>Income Statement</Typography>
                    <TextField label="Gross Profit" variant="outlined" defaultValue={companyToEdit?.grossProfit || ""}/>
                    <TextField label="Gross Revenues" variant="outlined" defaultValue={companyToEdit?.grossRevenues || ""}/>
                    <TextField label="Net Income" variant="outlined" defaultValue={companyToEdit?.netIncome || ""}/>
                    <TextField label="Earnings Per Share (EPS) Basic" variant="outlined" defaultValue={companyToEdit?.earningsPerShareBasic || ""} />
                    <br/>
                    <Typography variant={"h6"}>Other info</Typography>
                    <TextField label="Cash" variant="outlined" defaultValue={companyToEdit?.cash || ""}/>
                    <TextField label="Accounts Receivable" variant="outlined" defaultValue={companyToEdit?.accountsReceivable || ""}/>
                    <TextField label="Total Debt" variant="outlined" defaultValue={companyToEdit?.totalDebt || ""}/>
                    <TextField label="EBITDA" variant="outlined" defaultValue={companyToEdit?.ebitda || ""}/>
                    <TextField label="Interest Expense" variant="outlined" defaultValue={companyToEdit?.interestExpense || ""}/>
                </Box>
            </Box>
        </Modal>
    );
}

export default UpdateCompanyModal;