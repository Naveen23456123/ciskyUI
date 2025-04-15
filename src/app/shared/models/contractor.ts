
export  interface IContractor{
    id: string,
                name: string,
                cost: string,
                costwithcos: string,
                projectlength: string,
                contractorbidduedate: string,
                loaawarddate: string,
                agreementdate: string,
                projectduration: string,
                commencementdate: string,
                actualcompletiondate: string,
                schedulecompletiondate: string,
                schedulecompletiondatewitheot:string,
                actualconstructioncompletiondate: string,
                scheduleconstructioncompletiondate: string,
                scheduleconstructioncompletiondatewitheot: string,
                contractoraddress: string,
                eots: [],
                coss: [],
                billingdetails: [
                    {
                        billsubmittedtotal: 0,
                        siterecommendedbillamount: 0,
                        recommendedbillamount: 0
                    }
                ],
                latestprogress: {
                    financialprogress: null,
                    physicalprogress: null,
                    month: null,
                    year: null
                }

}