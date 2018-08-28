import { Service } from "@tsed/common";

@Service()
export class <%= serviceClassName %> {
   
    constructor() {
    }

    public testMethod = async (): Promise<any> => {
        return Promise.resolve({
            test: 'done'
        });
    };

}