import { ICasePayments } from '../../interfaces/ICasePayments';

export const CASEPAYMENTS: ICasePayments[] = [
    {
        'caseNumber': '2309-1129-5569-2669',
        'payments': [{
                'paymentReference': 'RC-2332-5352-6211-7352',
                'dateCreated': '28 Jun 2018—12:27:15',
                'paymentMethod': 'card',
                'paymentAmount': '£215.00',
                'status': 'failed'
            },
            {
                'paymentReference': 'RC-1313-5251-7432-6214',
                'dateCreated': '28 Jun 2018—12:28:45',
                'paymentMethod': 'card',
                'paymentAmount': '£215.00',
                'status': 'failed'
            },
            {
                'paymentReference': 'RC-1313-5251-7432-6214',
                'dateCreated': '28 Jun 2018—12:28:45',
                'paymentMethod': 'card',
                'paymentAmount': '£215.00',
                'status': 'Success'
            }]
    },
    {
        'caseNumber': '0032-5362-1372-9831',
        'payments': [{
            'paymentReference': 'RC-2332-5352-6212-7352',
            'dateCreated': '28 May 2018—12:27:15',
            'paymentMethod': 'card',
            'paymentAmount': '£399.00',
            'status': 'failed'
        },
            {
                'paymentReference': 'RC-1313-5251-7437-6214',
                'dateCreated': '28 May 2018—12:28:45',
                'paymentMethod': 'card',
                'paymentAmount': '£399.00',
                'status': 'failed'
            },
            {
                'paymentReference': 'RC-1313-5251-7421-6214',
                'dateCreated': '28 May 2018—12:28:45',
                'paymentMethod': 'card',
                'paymentAmount': '£399.00',
                'status': 'Success'
            }]
    }
];
