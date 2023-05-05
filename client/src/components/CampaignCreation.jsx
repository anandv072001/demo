import React, { useState } from "react";
import Web3 from "web3";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CampaignCreation.css';
import CampaignFactory from "../contracts/CampaignFactory.json";

function CampaignCreation() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [target, setTarget] = useState("");
  const [minimum, setMinimum] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // Get network provider and web3 instance
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

      // Get the contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CampaignFactory.networks[networkId];
      const instance = new web3.eth.Contract(
        CampaignFactory.abi,
        "0x2F4DfD81c3901BB56CE71bB255825802Ac4dd0B6"
      );

      // Create the new campaign
      await instance.methods
        .createCampaign(name, description, url, target, minimum)
        .send({ from: '0x59B4b07Ca0B1425039291F7dD86fDCfCEcbC1a73'});

      // Reset the form
      setName("");
      setDescription("");
      setUrl("");
      setTarget("");
      setMinimum("");
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="campaign-creation">
  <h1>Create a new campaign</h1>
  <form className="campaign-form" onSubmit={onSubmit}>
    <div className="form-group">
      <label className="form-label" htmlFor="name-input">
        Name
      </label>
      <input
        id="name-input"
        className="form-control"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </div>
    <div className="form-group">
      <label className="form-label" htmlFor="description-input">
        Description
      </label>
      <textarea
        id="description-input"
        className="form-control"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
    </div>
    <div className="form-group">
      <label className="form-label" htmlFor="url-input">
        URL
      </label>
      <input
        id="url-input"
        className="form-control"
        type="text"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />
    </div>
    <div className="form-group">
      <label className="form-label" htmlFor="target-input">
        Target amount
      </label>
      <input
        id="target-input"
        className="form-control"
        type="number"
        value={target}
        onChange={(event) => setTarget(event.target.value)}
      />
    </div>
    <div className="form-group">
      <label className="form-label" htmlFor="minimum-input">
        Minimum contribution
      </label>
      <input
        id="minimum-input"
        className="form-control"
        type="number"
        value={minimum}
        onChange={(event) => setMinimum(event.target.value)}
      />
    </div>
    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    <button type="submit" className="btn btn-rainbow" disabled={loading}>
      {loading ? "Creating..." : "Create campaign"}
    </button>
  </form>
</div>

  
  );
}

export default CampaignCreation;
