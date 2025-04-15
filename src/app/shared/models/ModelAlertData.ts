export enum AlertType{ INFO, WARNING, ERROR}

export class ModelAlertData{
    title: string='';
    content: string='';
    alertType: AlertType= AlertType.INFO;
    acceptLabel: string='';
    closeLabel: string='';
    constructor(data?: any)
    {
        if (data)
        {
            this.title = data.title;
            this.content = data.content;
            this.alertType = data.alertType;
            this.acceptLabel = data.acceptLabel;
            this.closeLabel = data.closeLabel;
        }

    }

}
