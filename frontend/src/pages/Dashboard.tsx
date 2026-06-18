function Dashboard() {


    return (

        <div>


            <h1 className="text-3xl font-bold">

                Dashboard 🚀

            </h1>


            <div className="grid grid-cols-3 gap-5 mt-8">


                <div className="bg-white p-5 rounded-xl shadow">

                    <h2>Total Students</h2>

                    <p className="text-3xl font-bold">
                        0
                    </p>


                </div>



                <div className="bg-white p-5 rounded-xl shadow">

                    <h2>Admins</h2>

                    <p className="text-3xl font-bold">
                        1
                    </p>


                </div>



                <div className="bg-white p-5 rounded-xl shadow">

                    <h2>Status</h2>

                    <p className="text-green-600 font-bold">
                        Active
                    </p>


                </div>


            </div>


        </div>

    );

}


export default Dashboard;