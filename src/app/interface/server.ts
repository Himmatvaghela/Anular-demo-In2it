

export interface tableData{
    id: string,
    solutionArea:string,
    workflow: string,
    taskId: string,
    task: string,
    status: string,
    startDate: string,
    dueDate: string,
    priority: string
}

export interface organizationData{
    id:string,
    organization:string,
    type:string,
    industry:string,
    onboarding: string,
    related_orgs: string[],
    products: string[],
    org_SPOC: string,
    description:string,
    cluster:string,
    tier:string,
    address:string,
    contacts:{
        id:string,
        name:string,
        email:string,
        phone_code:string,
        phone:string,
        other:{medium:string,phone_code_other?:string,fieldVal:string}[]
        role:string,
        additionalRole:string
    }[]
}

export interface contactsDetails {
    id:string,
    name:string,
    email:string,
    phone_code:string,
    phone:string,
    other:{medium:string,phone_code_other?:string,fieldVal:string}[]
    role:string,
    additionalRole:string
}



/// interface for product module.................

export interface standardProductTable {
    is_table_exist?: boolean;
    is_editMode?:boolean;
    addMode?:boolean;
    updatedData?:any;
    table_id: {
        value: number | null;
        is_edit: boolean | null;
        type: string | null;
    };
    table_type: {
        value: string;
        is_edit: boolean | null;
        type: string | null;
    };
    table_name: {
        value: string;
        is_edit: boolean | null;
        type: string | null;
    };
    description: {
        value: string;
        is_edit: boolean | null;
        type: string | null;
    };
    attribute_count: {
        value: number | null;
        is_edit: boolean | null;
        type: string | null;
    };
    rows_count: {
        value: number | null;
        is_edit: boolean | null;
        type: string | null;
    };
    created_on: {
        value: string | null;
        is_edit: boolean | null;
        type: string | null;
    };
    created_by: {
        value: string | null;
        is_edit: boolean | null;
        type: string | null;
    };
    updated_on: {
        value: string | null;
        is_edit: boolean | null;
        type: string | null;
    }|null;
    updated_by: {
        value: string | null;
        is_edit: boolean | null;
        type: string | null;
    }|null;
    is_standard: {
        value: boolean | null;
        is_edit: boolean | null;
        type: string | null;
    };
    is_active: {
        value: boolean | null;
        is_edit: boolean | null;
        type: string | null;
    };
    property?: {
        is_edit: boolean | null;
        is_delete: boolean | null;
    };
    related_table?: {
        id: number;
        name: string;
    }[] | null;
}

