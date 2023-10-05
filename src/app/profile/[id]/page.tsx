export default function Userprofile({params}: any){
    return(
        <div className="profile flex flex-col items-center justify-center min-h-screen py-2">
            <h1>profile</h1>
            <hr />
            <h1 className="text-4xl">Profile Page <span className="p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span></h1>
        </div>
    );
}