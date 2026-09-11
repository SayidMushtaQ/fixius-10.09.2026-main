export function calculateDistanceVincenty(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number {
	const a: number = 6378137; // Radius of the Earth in meters
	const f: number = 1 / 298.257223563; // Flattening
	const b: number = (1 - f) * a; // Semi-minor axis

	const phi1: number = toRadians(lat1);
	const phi2: number = toRadians(lat2);
	const lambda1: number = toRadians(lon1);
	const lambda2: number = toRadians(lon2);

	const U1: number = Math.atan((1 - f) * Math.tan(phi1));
	const U2: number = Math.atan((1 - f) * Math.tan(phi2));
	const L: number = lambda2 - lambda1;
	let Lambda: number = L;
	let iterLimit: number = 100;
	let sinU1: number = Math.sin(U1);
	let cosU1: number = Math.cos(U1);
	let sinU2: number = Math.sin(U2);
	let cosU2: number = Math.cos(U2);
	let sinLambda: number,
		cosLambda: number,
		sinSigma: number,
		cosSigma: number,
		sigma: number,
		sinAlpha: number,
		cosSqAlpha: number,
		cos2SigmaM: number,
		C: number;
	let LambdaPrev: number;
	do {
		sinLambda = Math.sin(Lambda);
		cosLambda = Math.cos(Lambda);
		sinSigma = Math.sqrt(
			cosU2 * sinLambda * (cosU2 * sinLambda) +
				(cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) *
					(cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
		);
		if (sinSigma === 0) {
			return 0; // Co-incident points
		}
		cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
		sigma = Math.atan2(sinSigma, cosSigma);
		sinAlpha = (cosU1 * cosU2 * sinLambda) / sinSigma;
		cosSqAlpha = 1 - sinAlpha * sinAlpha;
		cos2SigmaM = cosSigma - (2 * sinU1 * sinU2) / cosSqAlpha;
		if (isNaN(cos2SigmaM)) {
			cos2SigmaM = 0; // Equatorial line: cosSqAlpha=0 (§6)
		}
		C = (f / 16) * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
		LambdaPrev = Lambda;
		Lambda =
			L +
			(1 - C) *
				f *
				sinAlpha *
				(sigma +
					C *
						sinSigma *
						(cos2SigmaM +
							C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
	} while (Math.abs(Lambda - LambdaPrev) > 1e-12 && --iterLimit > 0);
	if (iterLimit === 0) {
		return NaN; // Formula failed to converge
	}
	const uSq: number = (cosSqAlpha * (a * a - b * b)) / (b * b);
	const A: number =
		1 + (uSq / 16384) * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
	const B: number =
		(uSq / 1024) * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
	const deltaSigma: number =
		B *
		sinSigma *
		(cos2SigmaM +
			(B / 4) *
				(cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) -
					(B / 6) *
						cos2SigmaM *
						(-3 + 4 * sinSigma * sinSigma) *
						(-3 + 4 * cos2SigmaM * cos2SigmaM)));
	const s: number = b * A * (sigma - deltaSigma);
	const result = s / 1000;
	return Number(result.toFixed(2));
}

function toRadians(degrees: number): number {
	return degrees * (Math.PI / 180);
}
