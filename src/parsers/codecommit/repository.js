const _ = require("lodash");

module.exports = {

	// CodeCommit: Repo Change
	matches: event => event.getSource() === "codecommit"
		&& _.get(event.message, "detail-type") === "CodeCommit Repository State Change",

	parse: event => {
		const message = event.message;
		const callerArn = _.get(message, "detail.callerUserArn");
		const refName = _.get(message, "detail.referenceName");
		const refType = _.get(message, "detail.referenceType");
		const repoName = _.get(message, "detail.repositoryName");
		const repoEvent = _.get(message, "detail.event");
		const repoUrl = `https://console.aws.amazon.com/codecommit/home?region=${message.region}#/repository/${repoName}`;
		const fields = [];

		const color = event.COLORS.neutral;
		let title = repoName;
		if (repoEvent === "referenceCreated" && refType === "branch") {
			title = `New branch created in repository ${repoName}`;
		}
		else if (repoEvent === "referenceUpdated" && refType === "branch") {
			title = `New commit pushed to repository ${repoName}`;
		}
		else if (repoEvent === "referenceDeleted" && refType === "branch") {
			title = `Deleted branch in repository ${repoName}`;
		}
		else if (repoEvent === "referenceCreated" && refType === "tag") {
			title = `New tag created in repository ${repoName}`;
		}
		else if (repoEvent === "referenceUpdated" && refType === "tag") {
			title = `Tag reference modified in repository ${repoName}`;
		}
		else if (repoEvent === "referenceDeleted" && refType === "tag") {
			title = `Deleted tag in repository ${repoName}`;
		}

		if (repoName) {
			fields.push({
				title: "Repository",
				value: repoName,
				short: true,
			});
		}

		if (refType) {
			fields.push({
				title: _.toUpper(refType.charAt(0)) + refType.slice(1),
				value: refName,
				short: true,
			});
		}

		if (callerArn) {
			fields.push({
				title: "Caller ARN",
				value: callerArn,
			});
		}

		return event.attachmentWithDefaults({
			author_name: "AWS CodeCommit",
			fallback: `${repoName}: ${title}`,
			color: color,
			title: title,
			title_link: repoUrl,
			fields: fields,
			mrkdwn_in: ["title", "text"],
		});
	},
};
