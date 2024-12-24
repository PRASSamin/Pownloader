import Script from 'next/script';

const GoogleAna = () => {
    return (
        <>
            <Script
                strategy='afterInteractive'
                async
                src='https://www.googletagmanager.com/gtag/js?id=G-1W6TNHVQE6'
            />
            <Script
                id='google-analytics'
                strategy='afterInteractive'
            >
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', 'G-1W6TNHVQE6');
        `}
            </Script>
        </>
    );
}

export default GoogleAna;