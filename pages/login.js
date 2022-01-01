import { getProviders, signIn } from "next-auth/react";
function Login({ providers }) {

    return (
        <div className="flex flex-col items-center min-h-screen w-full justify-center bg-black">
            <img
                className="w-52 mb-5"
                src="https://links.papareact.com/9xl"
                alt=""
            />
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button
                        className="bg-[#18D860] text-white rounded-full p-5"
                        onClick={() =>
                            signIn(provider.id, { callbackUrl: "/" })
                        }
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Login;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}
