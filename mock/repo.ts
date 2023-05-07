import {Request, Response} from 'express';

const getRepoTree = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    totalCount: 3,
    pageSize: 10,
    pageIndex: 1,
    data: [
      {
        id: '1',
        name: 'src',
        path: 'src',
        type: 'tree',
      },
      {
        id: '2',
        name: 'pom.xml',
        path: 'pom.xml',
        type: 'blob',
      },
      {
        id: '3',
        name: 'README.md',
        path: 'README.md',
        type: 'blob',
      },
      {
        id: '4',
        name: '.gitignore',
        path: '.gitignore',
        type: 'blob',

      },
      {
        id: '5',
        name: 'LICENSE',
        path: 'LICENSE',
        type: 'blob',

      },
    ],
    notEmpty: true,
    totalPages: 1,
    empty: false,
  });
};
const getRepoBlob = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: "package cn.meshed.cloud.platform.config.dto;\r\n\r\nimport io.swagger.v3.oas.annotations.media.Schema;\r\nimport lombok.Data;\r\nimport lombok.EqualsAndHashCode;\r\n\r\nimport com.alibaba.cola.dto.DTO;\r\nimport io.swagger.annotations.ApiModelProperty;\r\n\r\n/**\r\n* <h1>字典</h1>\r\n* <p>字典管理传输对象</p>\r\n*\r\n* @author Meshed Cloud 研发平台\r\n* @version 10000\r\n*/\r\n@EqualsAndHashCode(callSuper = false)\r\n@Data\r\n@Schema(description = \"字典管理传输对象\")\r\npublic class DictDTO extends DTO {\r\n\r\n    private static final long serialVersionUID = 1L;\r\n\r\n    /**\r\n    * 字典ID\r\n    */\r\n    @Schema(description = \"字典ID\")\r\n    @ApiModelProperty(value=\"字典ID\")\r\n    private String id;\r\n    /**\r\n    * 字典名称\r\n    */\r\n    @Schema(description = \"字典名称\")\r\n    @ApiModelProperty(value=\"字典名称\")\r\n    private String name;\r\n    /**\r\n    * 字典状态\r\n    */\r\n    @Schema(description = \"字典状态\")\r\n    @ApiModelProperty(value=\"字典状态\")\r\n    private String status;\r\n    /**\r\n    * 字典类型\r\n    */\r\n    @Schema(description = \"字典类型\")\r\n    @ApiModelProperty(value=\"字典类型\")\r\n    private String type;\r\n\r\n}"
  });
};

const getRepoDetails = (req: Request, res: Response) => {
  res.json({
    success: true,
    errCode: null,
    errMessage: null,
    data: {
      uuid: "1",
      name: '研发平台服务端',
      repoName: 'meshed-cloud-rd',
      repoUrl: 'https://github.com/meshed-cloud/meshed-cloud-rd.git',
      type: 'SERVICE',
      status: 'DEV',
      description: '研发平台服务端',
      version: 10000,
      branchs: ['master', 'develop']
    },
  });
};

export default {
  'GET /api/rd/repo/tree': getRepoTree,
  'GET /api/rd/repo/blob': getRepoBlob,
  'GET /api/rd/repo/details/*': getRepoDetails,
};
