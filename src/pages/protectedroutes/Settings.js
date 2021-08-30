import axios from "axios";
import { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../../utils/reducer";
import UserIcon from "../../components/icons/user";


class Settings extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.state = {
            username: "",
            email: "",
            picture: ""
        }
    }

    componentDidMount() {
        this.setState({
            username: this.props.state.name,
            email: this.props.state.mail,
            picture: this.props.state.pic
        })
    }

    handleDelete(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            picture: ''
        })

    }

    handleChange(e) {
        if (e.target.name === "name") {
            this.setState({
                ...this.state,
                username: e.target.value
            })
        }
        if (e.target.name === "mail") {
            this.setState({
                ...this.state,
                email: e.target.value
            })
        }
    }

    handleImageUpload(e) {

        const reader = new FileReader();
        let fileData = null;

        reader.onload = (e) => {
            fileData = e.target.result
            this.imageConverter(fileData)
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    imageConverter(fileData){
        if (typeof fileData !== undefined) {
            // file size should not exceed 128x128px with resolution 72ppi and 4bits depth
            // Calc: (((128*128)/72)/4)*1.3478
            if (fileData.length < 76675) {
                try {
                    this.setState({
                        ...this.state,
                        picture: fileData
                    })
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.error("Size too big")
            }
        } else {
            console.error("File must be an image")
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        let userData = {};
        if (this.state.username !== this.props.state.name) {
            userData.username = this.state.username;
        }
        if (this.state.email !== this.props.state.mail) {
            userData.email = this.state.email;
        }
        if (this.state.picture !== this.props.state.pic) {
            userData.picture = this.state.picture;
        }
        if (Object.keys(userData).length > 0) {
            try {
                const { data, status } = await axios.put('/profile', userData)
                if (status === 200) {
                    this.props.addUser(data)
                }
            } catch (err) {
                console.error(err);
            }
            this.setState({
                username: this.props.state.name,
                email: this.props.state.mail,
                picture: this.props.state.pic
            })
        }
    }



    render() {
        return (
            <main className="relative bg-off-white h-full">
                <div className="py-8 px-12 h-full">
                    <section className="h-full">
                        <div className="h-full grid grid-cols-8">
                            <div className="col-span-12">
                                <div className="h-full bg-white border border-off-gray-light shadow-md rounded-lg p-10">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="mb-4 flex flex-col items-center">
                                            <div className="h-32 w-32 rounded-full overflow-hidden shadow-2xl mb-8">
                                                {
                                                    this.state.picture
                                                        ?
                                                        <img className="h-full w-full object-cover object-center" src={this.state.picture} alt={this.state.username} />
                                                        :
                                                        <UserIcon height="h-full" width="w-full" />
                                                }
                                            </div>
                                            <div className="flex">
                                                <div className="group relative mr-2" >
                                                    <input type="button" value="Change Picture" className="p-1.5 text-sm text-white bg-off-voilet-dark cursor-pointer rounded-sm group-hover:bg-off-blue-biased group-hover:shadow-2xl" />
                                                    <input type="file" onChange={this.handleImageUpload} accept="image/x-png, image/gif, image/jpeg" className="w-full h-full top-0 left-0 cursor-pointer absolute opacity-0" />
                                                </div>
                                                <input type="button" name="delete" value="Delete Picture" onClick={this.handleDelete} className="disabled p-1 text-sm text-off-pink-hot bg-white border-2 border-off-pink-hot rounded-sm cursor-pointer hover:border-off-red-700 hover:shadow-2xl" />
                                            </div>
                                            <p className="text-xs text-gray-400 mt-4">Image must be of maximum size 128x128</p>
                                        </div>
                                        <div className="mb-8 flex flex-col items-center justify-center">
                                            <div className="flex flex-col mb-4">
                                                <label className="text-sm" htmlFor="user_name">Username</label>
                                                <input name="name" value={this.state.username} className="border-2 border-gray-400 rounded-sm pl-2 py-1 mt-2 w-80" type="text" id="user_name" onChange={this.handleChange} />
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="text-sm" htmlFor="user_mail">Email</label>
                                                <input name="mail" value={this.state.email} className="border-2 border-gray-400 rounded-sm pl-2 py-1 mt-2 w-80" type="text" id="user_mail" onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="mt-12 text-center">
                                            <input className="text-white bg-green-600 hover:bg-green-700 hover:shadow-2xl py-1.5 px-4 rounded-sm w-80" type="submit" value="Save" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );
    }
}


const mapStateToProps = state => {
    return {
        state: state.scrumer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (data) => dispatch(addUser(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);