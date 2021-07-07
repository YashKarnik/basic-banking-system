import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../components/loading';

function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	useEffect(() => {
		const handleStart = url => setLoading(true);
		const handleComplete = url => setLoading(false);

		router.events.on('routeChangeStart', handleStart);
		router.events.on('routeChangeComplete', handleComplete);
		router.events.on('routeChangeError', handleComplete);

		return () => {
			router.events.off('routeChangeStart', handleStart);
			router.events.off('routeChangeComplete', handleComplete);
			router.events.off('routeChangeError', handleComplete);
		};
	}, []);

	if (loading) return <Loading isFull={true} />;
	else return <Component {...pageProps} />;
}

export default MyApp;
