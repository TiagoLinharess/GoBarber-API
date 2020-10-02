interface IMailConfig {
    driver: 'ethereal' | 'ses';

    defaults: {
        from: {
            email: string;
            name: string;
        }
    }
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'sinvalfilho100@gmail.com',
            name: 'Sinval Albuquerque'
        }
    }
} as IMailConfig;