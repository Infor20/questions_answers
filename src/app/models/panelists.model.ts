import { IPanelists } from '../interfaces/ipanelists';

export class Panelist implements IPanelists {
    id: string = ''
    lastname: string = ''
    name: string = ''
    nationality: string = ''
    panelId: string = ''
    phone: number = 0
    points: string = ''
    rut: string = ''

    constructor(ipanelists?: IPanelists){
        Object.assign(this, ipanelists)
    }

    public model(id?:string): IPanelists{
        return {
            id: this.id || id,
            lastname: this.lastname,
            name: this.name,
            nationality: this.nationality,
            panelId: this.panelId,
            phone: this.phone,
            points: this.points,
            rut: this.rut
        };
    }
}


