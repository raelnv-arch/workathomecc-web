export default {
    async redirects() {
        return [
            {
                source: '/contact-us-now',
                destination: 'https://www.workathomecc.com/#contact',
                permanent: true,
            },
        ];
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
}
