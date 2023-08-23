import React, { useState, useEffect } from "react";
import { Alert, Box, Button, Divider, Modal, TextField, Typography } from "@mui/material";
import { UpdateCompanyModalProps } from "../types/UpdateCompanyModalProps";
import Company from "../types/company";
import '../styles/modal.css';
import { dividerStyle, modalStyle, textFieldMargins } from "../styles/modalStyles";
import { primaryButtonStyle, secondaryButtonStyle } from "../styles/styles";
import { alertStyle } from "../styles/styles";

function UpdateCompanyModal(props: UpdateCompanyModalProps) {
    const { showModal, companyToEdit, onClose, onUpdateSubmit } = props;

    const [stockPrice, setStockPrice] = useState(companyToEdit.stockPrice || 0);
    const [currentAssets, setCurrentAssets] = useState(companyToEdit?.currentAssets || 0);
    const [totalAssets, setTotalAssets] = useState(companyToEdit?.totalAssets || 0);
    const [currentLiabilities, setCurrentLiabilities] = useState(companyToEdit?.currentLiabilities || 0);
    const [totalLiabilities, setTotalLiabilities] = useState(companyToEdit?.totalLiabilities || 0);
    const [totalShareholdersEquity, setTotalShareholdersEquity] = useState(companyToEdit?.totalShareholdersEquity || 0);
    const [grossRevenues, setGrossRevenues] = useState(companyToEdit?.grossRevenues || 0);
    const [grossExpenses, setGrossExpenses] = useState(companyToEdit?.grossExpenses || 0);
    const [grossProfit, setGrossProfit] = useState(companyToEdit?.grossProfit || 0);
    const [netIncome, setNetIncome] = useState(companyToEdit?.netIncome || 0);
    const [earningsPerShareBasic, setEarningsPerShareBasic] = useState(companyToEdit?.earningsPerShareBasic || 0);
    const [cash, setCash] = useState(companyToEdit?.cash || 0);
    const [accountsReceivable, setAccountsReceivable] = useState(companyToEdit?.accountsReceivable || 0);
    const [ebitda, setEbitda] = useState(companyToEdit?.ebitda || 0);
    const [interestExpense, setInterestExpense] = useState(companyToEdit?.interestExpense || 0);
    
    useEffect(() => {
        setGrossProfit(grossRevenues-grossExpenses);
    }, [grossRevenues, grossExpenses]);

    return(
        <Modal
            open={showModal}
            onClose={onClose}
        >
            <Box sx={{...modalStyle}}>
                <Typography className="modalHeader" variant={"h4"}>{companyToEdit?.name}</Typography>
                <Alert sx={{...alertStyle}} severity={"info"} variant="filled">Fields marked with an * are required for analysis.</Alert>
                <br/>
                <Box>
                    
                    <Divider textAlign="left" sx={{...dividerStyle}}>
                        <Typography className="modalText" variant={"h6"}>Stock Data</Typography>
                    </Divider>
                    <TextField 
                        label="Stock Price" 
                        required
                        variant="outlined" 
                        sx={{...textFieldMargins}}
                        type={"number"}
                        value={stockPrice}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStockPrice(parseFloat(e.target.value))}
                    />
                    <Divider textAlign="left" sx={{...dividerStyle}}>
                        <Typography className="modalText" variant={"h6"}>Balance Sheet</Typography>
                    </Divider>
                    <br/>
                    <TextField 
                        sx={{...textFieldMargins}} required label="Current Assets" variant="outlined" value={currentAssets}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentAssets(parseFloat(e.target.value))}
                    />
                    <TextField 
                        sx={{...textFieldMargins}} required label="Total Assets" variant="outlined"
                        value={totalAssets}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalAssets(parseFloat(e.target.value))}
                    />
                    <TextField sx={{...textFieldMargins}} required label="Current Liabilities" variant="outlined"
                        value={currentLiabilities}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentLiabilities(parseFloat(e.target.value))}
                    />
                    <TextField sx={{...textFieldMargins}} required label="Total Liabilities" variant="outlined"
                        value={totalLiabilities}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalLiabilities(parseFloat(e.target.value))}
                    />
                    <TextField 
                        sx={{...textFieldMargins}} required label="Total Shareholders' Equity" variant="outlined"
                        value={totalShareholdersEquity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotalShareholdersEquity(parseFloat(e.target.value))}
                    />
                    <Divider textAlign="left" sx={{...dividerStyle}}>
                        <Typography className="modalText" variant={"h6"}>Income Statement</Typography>
                    </Divider>
                    <br/>
                    <TextField 
                        sx={{...textFieldMargins}} required label="Gross Revenues" variant="outlined"
                        value={grossRevenues}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGrossRevenues(parseFloat(e.target.value))}
                    />
                    <TextField 
                        sx={{...textFieldMargins}} required label="Gross Expenses" variant="outlined"
                        value={grossExpenses}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGrossExpenses(parseFloat(e.target.value))}
                    />
                    <TextField 
                        sx={{...textFieldMargins}} required label="Gross Profit" variant="outlined"
                        value={grossProfit}
                    />
                    <TextField 
                        sx={{...textFieldMargins}} required label="Net Income" variant="outlined"
                        value={netIncome}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNetIncome(parseFloat(e.target.value))}
                    />
                    <TextField 
                        sx={{...textFieldMargins}} required label="Earnings Per Share (EPS) Basic" variant="outlined"
                        value={earningsPerShareBasic}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEarningsPerShareBasic(parseFloat(e.target.value))}
                    />
                    <Divider textAlign="left" sx={{...dividerStyle}}>
                        <Typography className="modalText" variant={"h6"}>Other info</Typography>
                    </Divider>
                    <br/>
                    <TextField 
                        sx={{...textFieldMargins}} label="Cash" variant="outlined"
                        value={cash}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCash(parseFloat(e.target.value))}
                    />
                    <TextField 
                        sx={{...textFieldMargins}} label="Accounts Receivable" variant="outlined"
                        value={accountsReceivable}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountsReceivable(parseFloat(e.target.value))}
                    />
                    <TextField 
                        sx={{...textFieldMargins}} label="EBITDA" variant="outlined"
                        value={ebitda}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEbitda(parseFloat(e.target.value))}
                    />
                    <TextField 
                        sx={{...textFieldMargins}} label="Interest Expense" variant="outlined"
                        value={interestExpense}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInterestExpense(parseFloat(e.target.value))}
                    />
                </Box>
                <Box
                    sx={{width: "100%", display: "flex", flexDirection: "row-reverse"}}
                >
                    <Button 
                        sx={{...primaryButtonStyle}} variant={"contained"}
                        onClick={() => {
                            const updatedCompany: Company = {
                                ...companyToEdit,
                                stockPrice,
                                currentAssets,
                                totalAssets,
                                currentLiabilities,
                                totalLiabilities,
                                totalShareholdersEquity,
                                grossRevenues,
                                grossExpenses,
                                grossProfit,
                                netIncome,
                                earningsPerShareBasic,
                                cash,
                                accountsReceivable,
                                ebitda,
                                interestExpense
                            }
                            onUpdateSubmit(updatedCompany);
                            onClose();
                        }}>
                        Update
                    </Button>
                    <Button 
                        sx={{...secondaryButtonStyle}} variant={"outlined"}
                        onClick={() => {
                            onClose();
                        }}
                    >Cancel</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default UpdateCompanyModal;